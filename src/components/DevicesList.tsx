"use client"

import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

export interface Device {
  deviceId: string;
  deviceKey: string; // hashed, not displayed
  uptime: number;    // en secondes
  connected: boolean;
}

interface DevicesListProps {
  devices: Device[];
}

export default function DevicesList({ devices }: DevicesListProps) {
  if (!devices || devices.length === 0) {
    return <p className="text-gray-500 italic">Aucun appareil disponible.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Device ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Uptime
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Connecté
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {devices.map(({ deviceId, uptime, connected }, idx) => (
            <tr key={deviceId + idx} className="hover:bg-gray-100">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {deviceId}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                {Math.floor(uptime / 3600)}h {Math.floor((uptime % 3600) / 60)}m
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex items-center space-x-1">
                {connected ? <CheckCircle size={16} className="text-green-500" /> : <XCircle size={16} className="text-red-500" />}
                <span>{connected ? 'Oui' : 'Non'}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}