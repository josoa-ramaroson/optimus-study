"use client"

import React, { useState } from 'react';
import SensorList from '@/components/SensorList';
import { useAuthStore } from '@/store/authStore';


export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
     <section className=" flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10 lg:max-w-7xl lg:mx-auto">
  {/* Header */}
  <header className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0">
    <div>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
        Tableau de bord
      </h1>
      <p className="mt-1 text-gray-600">
        {user ? `Bonjour, ${user.name}!` : 'Bonjour!'} Voici un aperçu de vos données.
      </p>
    </div>
    <div>
      <button
        className="
          inline-flex items-center 
          bg-blue-600 text-white font-medium
          px-4 py-2 rounded-md
          hover:bg-blue-700
          focus:outline-none focus:ring-2 focus:ring-blue-500
          transition
        "
      >
        Rafraîchir
      </button>
    </div>
  </header>

  {/* Résumé des capteurs */}
  <section className="bg-white shadow rounded-lg p-6">
    <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
      Résumé des capteurs
    </h2>
    <SensorList />
  </section>

  {/* Informations générales */}
  <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {[
      { label: "Environnement d'étude", value: 'Optimal', from: 'green', },
      { label: 'Total capteurs', value: 4, from: 'blue' },
      { label: 'Température moyenne', value: '23.5°C', from: 'yellow' },
      { label: 'Statut ESP32', value: 'Connecté', from: 'purple' },
    ].map(({ label, value, from }) => (
      <div
        key={label}
        className={`
          bg-gradient-to-br from-${from}-50 to-${from}-100
          p-6 rounded-lg shadow flex flex-col
        `}
      >
            <span className={`text-sm font-medium text-${from}-700`}>{label}</span>
            <span className={`mt-2 text-xl font-bold text-${from}-900`}>{value}</span>
          </div>
        ))}
      </section>

      {/* Section d'activités */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          Activités récentes
        </h2>
        <div className="text-center text-gray-500 py-20">
          Aucune activité récente.
        </div>
      </section>
    </section>


    </div>
  );
}
