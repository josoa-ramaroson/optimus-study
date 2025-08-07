import { IUserInfo } from '@/store/authStore';
import axios from '../utils/axios'; 

export type TLoginResponse = {
  status: number;
  userInfo: IUserInfo;
  token: string
}
export default class AuthService {
  static async login(email: string, password: string): Promise<TLoginResponse> {
    const res = await axios.post('/auth/login', { email, password });
    
    return res.data;
  }

  static async logout(): Promise<void> {
    await axios.post('/auth/logout');
  }

  static async getProfile(): Promise<IUserInfo> {
    const res = await axios.get('/auth/me');
    return res.data;
  }
}