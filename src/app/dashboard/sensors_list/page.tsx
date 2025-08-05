"use client"

import React, { useEffect } from 'react';
import SensorList from '@/components/SensorList';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { Sensor } from '@/services/SensorService';
import HistorySensors from '@/components/HistorySensors';

export default function SensorListPage() {
  const { user } = useAuthStore();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!user) router.push('/login');
  // }, [user, router]);

  const mockSensorHistory: Sensor[] = [
    { id: '1', type: 'temperature', value: 22.5, timestamp: '2025-08-05T14:30:00Z', status: 'ok' },
    { id: '2', type: 'humidity',    value: 55,   timestamp: '2025-08-05T14:25:00Z', status: 'ok' },
    { id: '3', type: 'light',       value: 300,  timestamp: '2025-08-05T14:20:00Z' },
    { id: '4', type: 'sound',       value: 35,   timestamp: '2025-08-05T14:15:00Z', status: 'warning' },
    { id: '5', type: 'temperature', value: 23,   timestamp: '2025-08-05T14:10:00Z', status: 'ok' },
    { id: '6', type: 'humidity',    value: 50,   timestamp: '2025-08-05T14:05:00Z' },
  ];

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
        <SensorList />
      </section>

      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Historique des mesures</h2>
        <HistorySensors />
      </section>
    </div>
  );
}
