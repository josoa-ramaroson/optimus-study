'use client';
import React from 'react';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';

export default function HomePage() {
  const { user } = useAuthStore();
  if (user && typeof window !== 'undefined') {
    window.location.href = '/dashboard';
    return null;
  }
  return (
    <section className="relative overflow-hidden">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-32 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Optimisez votre espace d’étude
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Suivez en temps réel vos capteurs de lumière, son, température et humidité.
        </p>
        <Link href="/login">
          <span className="inline-block bg-white text-blue-700 font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition">
            Commencer maintenant
          </span>
        </Link>
      </div>
      {/* Features Section */}
      <div className="max-w-5xl mx-auto mt-[-4rem] bg-white rounded-xl shadow-xl p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3 text-center">
          <h3 className="text-xl font-bold text-blue-700">Fonctionnement</h3>
          <p className="text-gray-600">
            Inscrivez-vous, ajoutez vos capteurs et consultez vos données via notre tableau de bord.
          </p>
        </div>
        <div className="space-y-3 text-center">
          <h3 className="text-xl font-bold text-blue-700">Avantages</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>Visualisation claire et réactive</li>
            <li>Historique des mesures</li>
            <li>Alertes personnalisables</li>
          </ul>
        </div>
        <div className="space-y-3 text-center">
          <h3 className="text-xl font-bold text-blue-700">Pourquoi choisir Study Monitor?</h3>
          <p className="text-gray-600">
            Améliorez vos conditions d’étude en recevant des données fiables et faciles à interpréter.
          </p>
        </div>
      </div>
    </section>
  );
}