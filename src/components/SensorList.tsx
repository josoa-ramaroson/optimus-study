"use client"

import React, { useEffect } from 'react';
import {useSensorStore} from '../store/sensorStore';
import SensorService, { Sensor } from '../services/SensorService';
import SensorCard from './SensorCard';
import Spinner from './Spinner';

export default function SensorList() {
  // const { data, loading, setData } = useSensorStore();
  const data: Sensor[] =  [
    {
      id: "sensor-1",
      name: "Capteur Température",
      type: "temperature",
      value: 22.5,
      status: "Actif",
      timestamp: "2025-08-05T08:00:00Z"
    },
    {
      id: "sensor-2",
      name: "Capteur Humidité",
      type: "humidity",
      value: 55,
      status: "Inactif",
      timestamp: "2025-08-05T07:45:00Z"
    },
    {
      id: "sensor-3",
      name: "Capteur Lumière",
      type: "light",
      value: 400, 
      status: "Actif",
      timestamp: "2025-08-05T07:30:00Z"
    },
    {
      id: "sensor-4",
      name: "Capteur son",
      type: "sound",
      value: 400, 
      status: "Actif",
      timestamp: "2025-08-05T07:30:00Z"
    }
  ]

  // useEffect(() => {
  //   SensorService.getAll()
  //     .then(sensors => setData(sensors))
  //     .catch(console.error);
  // }, [setData]);

  // if (loading) return <Spinner />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map(sensor => (
        <SensorCard key={sensor.id} sensor={sensor} />
      ))}
    </div>
  );
}

