import axios from '../utils/axios'; // au lieu de 'axios'

export interface Sensor {
  id: string;
  name?: string; // Le nom est optionnel
  status?: string; // Le statut est optionnel
  type: 'light' | 'sound' | 'temperature' | 'humidity';
  value: number;
  timestamp: string;
}

export default class SensorService {
  static async getAll(): Promise<Sensor[]> {
    const res = await axios.get('/sensors');
    return res.data;
  }
}
