"use client"

import React from 'react';
import { Sensor } from '../services/SensorService';

export default function SensorCard({ sensor }: { sensor: Sensor }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-lg font-medium capitalize">{sensor.type}</h3>
      <p className="text-3xl mt-2">{sensor.value}</p>
      <span className="text-sm text-gray-500">{new Date(sensor.timestamp).toLocaleTimeString()}</span>
    </div>
  );
}