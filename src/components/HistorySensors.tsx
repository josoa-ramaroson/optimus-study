'use client';

import React, { useEffect, useState } from "react";
import { Thermometer, Droplet, Sun, Volume2 } from "lucide-react";
import SensorService, { ISensorData } from "../services/SensorService";

const HistorySensors: React.FC = () => {
  const [sensors, setSensors] = useState<ISensorData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const {data}= await SensorService.getAll();
        setSensors(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Erreur lors du chargement");
      } finally {
        setLoading(false);
      }
    };

    fetchSensors();
  }, []);

  if (loading) {
    return <p className="p-4">Chargement des données des capteurs…</p>;
  }

  if (error) {
    return <p className="p-4 text-red-600">Erreur : {error}</p>;
  }

  return (
    <div >
     
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="px-4 py-2 text-left">Horodatage</th>
              <th className="px-4 py-2 text-center">
                <div className="flex flex-col items-center">
                  <Thermometer className="w-5 h-5 text-red-500" />
                  <span>Température</span>
                </div>
              </th>
              <th className="px-4 py-2 text-center">
                <div className="flex flex-col items-center">
                  <Droplet className="w-5 h-5 text-blue-500" />
                  <span>Humidité</span>
                </div>
              </th>
              <th className="px-4 py-2 text-center">
                <div className="flex flex-col items-center">
                  <Sun className="w-5 h-5 text-yellow-500" />
                  <span>Luminosité</span>
                </div>
              </th>
              <th className="px-4 py-2 text-center">
                <div className="flex flex-col items-center">
                  <Volume2 className="w-5 h-5 text-green-500" />
                  <span>Son</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sensors.map((sensor) => (
              <tr
                key={sensor.recorded_at}
                className="border-t dark:border-gray-600"
              >
                <td className="px-4 py-2">
                  {new Date(sensor.recorded_at).toLocaleString()}
                </td>
                
                <td className="px-4 py-2 text-center">
                  { sensor.payload.temperature} °C
                </td>
                <td className="px-4 py-2 text-center">{ sensor.payload.humidity} %</td>
                <td className="px-4 py-2 text-center">{ sensor.payload.light} Lux</td>
                <td className="px-4 py-2 text-center">{ sensor.payload.sound} dB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorySensors;
