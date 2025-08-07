'use client';

import React, { useEffect, useState } from 'react';
import { ISensorData } from '@/services/SensorService';
import { Thermometer, Droplet, Sun, Volume2 } from 'lucide-react';

// Composant dédié pour l'affichage des dernières valeurs
interface LatestGridProps {
  latest: ISensorData;
}
export function SensorList({ latest }: LatestGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
      <div className="flex flex-col items-center">
        <Thermometer className="w-6 h-6 text-red-500 mb-1" />
        <span className="font-medium">{latest.payload.temperature} °C</span>
        <span className="text-sm text-gray-500">Température</span>
      </div>
      <div className="flex flex-col items-center">
        <Droplet className="w-6 h-6 text-blue-500 mb-1" />
        <span className="font-medium">{latest.payload.humidity} %</span>
        <span className="text-sm text-gray-500">Humidité</span>
      </div>
      <div className="flex flex-col items-center">
        <Sun className="w-6 h-6 text-yellow-500 mb-1" />
        <span className="font-medium">{latest.payload.light} Lux</span>
        <span className="text-sm text-gray-500">Luminosité</span>
      </div>
      <div className="flex flex-col items-center">
        <Volume2 className="w-6 h-6 text-green-500 mb-1" />
        <span className="font-medium">{latest.payload.sound} dB</span>
        <span className="text-sm text-gray-500">Son</span>
      </div>
    </div>
  );
}
