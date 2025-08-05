import React from "react";
import { BookOpenCheck, CalendarCheck2 } from "lucide-react";

export interface Prediction {
  timestamp: string;
  temperature: number;
  humidity: number;
  light: number;
  sound: number;
  isOptimal: boolean;
  notes?: string;
}

const predictions: Prediction[] = [
  {
    timestamp: "2025-08-04T10:00:00Z",
    temperature: 22.5,
    humidity: 45,
    light: 300,
    sound: 50,
    isOptimal: true,
    notes: "Conditions idéales pour la concentration."
  },
  {
    timestamp: "2025-08-04T13:00:00Z",
    temperature: 26.0,
    humidity: 60,
    light: 450,
    sound: 70,
    isOptimal: false,
    notes: "Trop de lumière et de bruit."
  },
  {
    timestamp: "2025-08-05T08:30:00Z",
    temperature: 21.0,
    humidity: 50,
    light: 280,
    sound: 45,
    isOptimal: true
  }
];


export default function History()  {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <BookOpenCheck className="w-6 h-6" />
        Historique des prédictions optimales
      </h2>
      <div className="space-y-4">
        {predictions.map((p, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg shadow border ${
              p.isOptimal ? "bg-green-100 border-green-300" : "bg-red-100 border-red-300"
            }`}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-gray-700">
                <CalendarCheck2 className="w-4 h-4" />
                <span className="text-sm">{new Date(p.timestamp).toLocaleString()}</span>
              </div>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  p.isOptimal ? "bg-green-600 text-white" : "bg-red-600 text-white"
                }`}
              >
                {p.isOptimal ? "Optimal" : "Non optimal"}
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-800">
              <div><span className="font-medium">Température:</span> {p.temperature} °C</div>
              <div><span className="font-medium">Humidité:</span> {p.humidity} %</div>
              <div><span className="font-medium">Lumière:</span> {p.light} Lux</div>
              <div><span className="font-medium">Son:</span> {p.sound} dB</div>
            </div>
            {p.notes && <p className="mt-2 text-sm text-gray-600 italic">{p.notes}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};