import React from "react";
import { Thermometer, Droplet, Sun, Volume2 } from "lucide-react";

// Interface Sensor avec 4 mesures
export interface Sensor {
  humidity: number;
  temperature: number;
  light: number;
  sound: number;
  timestamp: string;
}

// Exemple de données
const testSensors: Sensor[] = [
  { humidity: 45, temperature: 22.5, light: 300, sound: 75, timestamp: "2025-08-04T10:00:00Z" },
  { humidity: 50, temperature: 23.0, light: 350, sound: 80, timestamp: "2025-08-04T12:00:00Z" },
  { humidity: 48, temperature: 22.8, light: 320, sound: 78, timestamp: "2025-08-05T08:00:00Z" },
];

const HistorySensors: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Historique des capteurs</h2>
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
            {testSensors.map((sensor) => (
              <tr key={sensor.timestamp} className="border-t dark:border-gray-600">
                <td className="px-4 py-2">{new Date(sensor.timestamp).toLocaleString()}</td>
                <td className="px-4 py-2 text-center">{sensor.temperature} °C</td>
                <td className="px-4 py-2 text-center">{sensor.humidity} %</td>
                <td className="px-4 py-2 text-center">{sensor.light} Lux</td>
                <td className="px-4 py-2 text-center">{sensor.sound} dB</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistorySensors;
