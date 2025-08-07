'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import SensorService, { ILatestSensorResponse, ISensorData, ISensorResponse } from '@/services/SensorService';
import { Thermometer, Droplet, Sun, Volume2 } from 'lucide-react';
import {SensorList} from '@/components/SensorList';
import Spinner from '@/components/Spinner';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  // États pour la dernière donnée
  const [latest, setLatest] = useState<ISensorData | null>(null);
  const [loadingLatest, setLoadingLatest] = useState<boolean>(true);
  const [errorLatest, setErrorLatest] = useState<string | null>(null);
  const [successLatest, setSuccessLatest] = useState<string | null>(null);

  // Redirection si utilisateur non connecté
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Fetch dernière donnée au chargement
  useEffect(() => {
    const fetchLatest = async () => {
      setLoadingLatest(true);
      setErrorLatest(null);
      setSuccessLatest(null);
      try {
        const resp: ILatestSensorResponse = await SensorService.getLatestByDeviceId('esp32_multi_sensor');
        if (resp.status === 200 && resp.data) {
          setLatest(resp.data as ISensorData);
          setSuccessLatest('Données chargées avec succès');
        } else {
          setErrorLatest(resp.message || 'Aucune donnée trouvée');
        }
      } catch (err: any) {
        setErrorLatest(err.message || 'Erreur lors de la récupération');
      } finally {
        setLoadingLatest(false);
      }
    };
    fetchLatest();
  }, []);

  // Effets pour effacer les messages après 4s
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (successLatest) {
      timer = setTimeout(() => setSuccessLatest(null), 4000);
    }
    return () => clearTimeout(timer);
  }, [successLatest]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (errorLatest) {
      timer = setTimeout(() => setErrorLatest(null), 4000);
    }
    return () => clearTimeout(timer);
  }, [errorLatest]);

  // Stats statiques
  const stats = [
    { label: 'Total capteurs', value: 4, from: () => 'blue' },
    { label: 'Température moyenne', value: '23.5 °C', from: () => 'yellow' },
    { label: 'Statut ESP32', value: 'Connecté', from: () => 'purple' },
    {
      label: 'Environnement d’étude',
      value: 'Optimal',
      from: (label: string, val: string) =>
        label === 'Environnement d’étude' && val === 'Optimal' ? 'green' : 'gray'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <section className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10 lg:max-w-7xl lg:mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Tableau de bord</h1>
            <p className="mt-1 text-gray-600">
              {user ? `Bonjour, ${user.username}!` : 'Bonjour!'} Voici un aperçu de vos données.
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="inline-flex items-center bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Rafraîchir
          </button>
        </header>

        {/* Résumé des capteurs */}
        <section className="bg-white shadow rounded-lg p-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Résumé des capteurs</h2>

          {/* Messages chargement / succès / erreur */}
          {loadingLatest ? (
            <div className="flex justify-center py-8">
              <Spinner />
            </div>
          ) : errorLatest ? (
            <div className="text-red-600 font-medium">Erreur : {errorLatest}</div>
          ) : successLatest ? (
            <div className="text-green-600 font-medium">Succès : {successLatest}</div>
          ) : null}

          {/* Date dernière mise à jour */}
          {!loadingLatest && latest && (
            <div className="text-gray-700 mb-4">
              <strong>Dernière mise à jour :</strong>{' '}
              {new Date(latest.recorded_at).toLocaleString()}
            </div>
          )}

          {/* Valeurs du dernier relevé via composant */}
          {!loadingLatest && latest && <SensorList latest={latest} />}

         
        </section>

        {/* Informations générales */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ label, value, from }) => {
            const color = from(label, value as string);
            return (
              <div
                key={label}
                className={`
                  bg-gradient-to-br from-${color}-50 to-${color}-100
                  p-6 rounded-lg shadow flex flex-col
                `}
              >
                <span className={`text-sm font-medium text-${color}-700`}>{label}</span>
                <span className={`mt-2 text-xl font-bold text-${color}-900`}>{value}</span>
              </div>
            );
          })}
        </section>

        {/* Section d'activités */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Activités récentes</h2>
          <div className="text-center text-gray-500 py-20">Aucune activité récente.</div>
        </section>
      </section>
    </div>
  );
}
