import { IUserInfo } from '@/store/authStore';
import axios from '../utils/axios';

export type TProfileResponse = {
  status: number;
  data: IUserInfo;
};

export default class ProfileService {
  /**
   * GET /profile/:userId
   * Récupère le profil d'un utilisateur
   */
  static async getProfile(userId: string): Promise<IUserInfo> {
    const res = await axios.get<TProfileResponse>(`/profile/${userId}`);
    return res.data.data;
  }

  /**
   * PUT /profile/:userId
   * Met à jour le profil d'un utilisateur
   */
  static async updateProfile(
    userId: string,
    payload: Partial<Omit<IUserInfo, 'userId'>> & { password?: string }
  ): Promise<IUserInfo> {
    const res = await axios.put<TProfileResponse>(`/profile/${userId}`, payload);
    return res.data.data;
  }
}
