'use client';

import React, { useState } from 'react';
import AuthService, { TLoginResponse } from '@/services/AuthService';
import { useAuthStore, IUserInfo } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { LogIn, ShieldCheck, Activity, GaugeCircle } from 'lucide-react';


export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { setUser, setToken } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const {
        userInfo, token, status
      }:TLoginResponse = await AuthService.login(email, password);
      setUser(userInfo);
      setToken(token);
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login failed:', err);
      setError('Identifiants invalides');
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch min-h-[80vh] w-full max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden ">
      {/* Banner section */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-10 md:w-1/2 flex flex-col justify-center space-y-6">
        <div className="flex items-center space-x-3">
          <LogIn size={40} className="text-white" />
          <h2 className="text-2xl font-bold">Bienvenue !</h2>
        </div>
        <p className="text-lg">
          Connectez-vous pour accéder à vos capteurs, visualiser les données en temps réel
          et optimiser votre environnement d’étude.
        </p>
        <ul className="space-y-3 mt-4 text-sm">
          <li className="flex items-center gap-2">
            <GaugeCircle className="w-5 h-5 text-white" />
            Suivi en temps réel des mesures
          </li>
          <li className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-white" />
            Données sécurisées et privées
          </li>
          <li className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-white" />
            Alertes et historique personnalisés
          </li>
        </ul>
      </div>

      {/* Form section */}
      <form
        onSubmit={handleSubmit}
        className="md:w-1/2 p-10 flex flex-col justify-center"
      >
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Connexion</h3>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border-gray-300 border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white cursor-pointer py-3 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          Connexion
        </button>
      </form>
    </div>
  );
}
