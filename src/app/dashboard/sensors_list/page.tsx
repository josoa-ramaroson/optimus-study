'use client';

import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import HistorySensors from '@/components/HistorySensors';
import Spinner from '@/components/Spinner';
import {SensorList} from '@/components/SensorList';
import SensorService, { ISensorData, ILatestSensorResponse } from '@/services/SensorService';

export default function SensorListPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  const [latest, setLatest] = useState<ISensorData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  // Fetch latest sensor data on mount
  useEffect(() => {
    const fetchLatest = async () => {
      setLoading(true);
      setError(null);
      setSuccess(null);
      try {
        const resp: ILatestSensorResponse = await SensorService.getLatestByDeviceId('esp32_multi_sensor');
        if (resp.status === 200 && resp.data) {
          setLatest(resp.data as ISensorData);
          setSuccess('Données chargées avec succès');
        } else {
          setError(resp.message || 'Aucune donnée trouvée');
        }
      } catch (err: any) {
        setError(err.message || 'Erreur lors de la récupération');
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  // Clear messages after 4s
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (success) timer = setTimeout(() => setSuccess(null), 4000);
    return () => clearTimeout(timer);
  }, [success]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (error) timer = setTimeout(() => setError(null), 4000);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <header className="flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
          <ArrowLeftIcon size={28} />
          <span className="text-lg font-medium">Retour</span>
        </Link>
        <h1 className="text-2xl font-semibold">Capteurs</h1>
      </header>

      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Liste des capteurs</h2>

        {loading ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        ) : error ? (
          <div className="text-red-600 font-medium">Erreur : {error}</div>
        ) : success ? (
          <div className="text-green-600 font-medium">Succès : {success}</div>
        ) : null}

        {/* Display latest data when available */}
        {!loading && latest && <SensorList latest={latest} />}
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Historique des mesures</h2>
        <HistorySensors />
      </section>
    </div>
  );
}
