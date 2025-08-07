import axios from '../utils/axios'; // au lieu de 'axios'

export interface ISensorData {
  payload: {
    humidity: number;
    temperature: number;
    light: number;
    sound: number;
  }
  deviceId: string;
  recorded_at: number;
}
export interface ISensorResponse {
  data: ISensorData[];
  message: string;
  status: number;
}
export interface ILatestSensorResponse {
  data: ISensorData | null;
  message: string;
  status: number;
}
export default class SensorService {
  static async getAll(): Promise<ISensorResponse> {
    const res = await axios.get('/api/all_sensors_data');
    return res.data;
  }
  static async getLatestByDeviceId(deviceId: string): Promise<ILatestSensorResponse> {
    const res = await axios.get(`api/latest_data/${deviceId}`);
    return res.data;
  }
}
