// src/store/sensorStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ISensorData } from '../services/SensorService';

export interface SensorState {
  data: ISensorData[];
  loading: boolean;
  setData: (d: ISensorData[]) => void;
}

export const useSensorStore = create<SensorState>()(
  persist(
    (set) => ({
      data: [],
      loading: true,
      setData: (data) => set({ data, loading: false }),
    }),
    {
      name: 'sensor-storage',
      storage: {
        getItem: (name) => {
          const value = localStorage.getItem(name);
          return value ? JSON.parse(value) : null;
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    }
  )
);

export default useSensorStore;
