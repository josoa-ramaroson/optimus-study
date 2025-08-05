"use client"

import React from 'react';
import DevicesList, { Device } from '@/components/DevicesList';
import Nav from '@/components/Nav';

export default function DevicesListPage() {
  // Mock data
  const mockDevices: Device[] = [
    { deviceId: 'ESP32-01', deviceKey: 'a1b2c3d4e5f6', uptime: 86400, connected: true },
    { deviceId: 'ESP32-02', deviceKey: 'f6e5d4c3b2a1', uptime: 43200, connected: false },
    { deviceId: 'ESP32-03', deviceKey: '112233445566', uptime: 123456, connected: true },
    { deviceId: 'ESP32-04', deviceKey: '665544332211', uptime: 9876, connected: false },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      

      <main className="flex-1 max-w-6xl mx-auto p-8 space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-gray-900">Appareils</h1>
          <p className="mt-2 text-gray-600">Liste de vos devices connectés.</p>
        </header>

        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Devices</h2>
          <DevicesList devices={mockDevices} />
        </section>
      </main>
    </div>
  );
}
