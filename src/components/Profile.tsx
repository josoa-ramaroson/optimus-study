import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import ProfileService from '@/services/ProfileService';
import { useRouter } from 'next/navigation';

export interface IUserInfo {
  userId: string;
  username: string;
  email: string;
  has_asmathic: boolean;
  has_bronchite_chronique: boolean;
  has_diabete: boolean;
  has_hypertension: boolean;
  has_allergies: boolean;
  has_migraine: boolean;
}

const Profile: React.FC = () => {
  const router = useRouter();
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState<IUserInfo | null>(null);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [pwError, setPwError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        let profile = user;
        if (!profile) {
          if (!user?.userId) throw new Error('User ID manquant');
          profile = await ProfileService.getProfile(user.userId);
          setUser(profile);
        }
        setFormData(profile as IUserInfo);
      } catch (err: any) {
        setError(err.message || 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, [user, setUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
   
    e.preventDefault();
    if (!formData) return;
    // password match check
    if (newPassword.trim()!= "" &&  confirmPassword.trim() != "" && (newPassword || confirmPassword) && newPassword !== confirmPassword) {
      setPwError('Les mots de passe ne correspondent pas');
      return;
    }
    setPwError(null);
    setLoading(true);
    setError(null);
    try {
      const payload: any = { ...formData };
      if (newPassword) payload.password = newPassword;
      console.log("payload:", payload);
      const updated = await ProfileService.updateProfile(formData.userId, payload);
      console.log("updated:", updated);
      // setUser(updated);
      // setFormData(updated);
      // setNewPassword('');
      // setConfirmPassword('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/dashboard');
  };

  if (loading) return <div className="p-4">Chargement...</div>;
  if (error) return <div className="p-4 text-red-600">Erreur: {error}</div>;
  if (!formData) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">Mon Profil</h1>
      <form onSubmit={handleSave} className="space-y-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 space-y-5">
            <div>
              <label className="block text-base font-medium">Nom d'utilisateur</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-3 text-base"
                required
              />
            </div>
            <div>
              <label className="block text-base font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border rounded-md p-3 text-base"
                required
              />
            </div>
            <div>
              <label className="block text-base font-medium">Nouveau mot de passe</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full border rounded-md p-3 text-base"
                placeholder="Laisser vide pour ne pas modifier"
              />
            </div>
            <div>
              <label className="block text-base font-medium">Confirmer le mot de passe</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full border rounded-md p-3 text-base"
                placeholder="Laisser vide pour ne pas modifier"
              />
              {pwError && <p className="mt-1 text-red-600 text-sm">{pwError}</p>}
            </div>
          </div>
          <fieldset className="w-full lg:w-1/2 border p-4 rounded-md">
            <legend className="text-base font-medium mb-3">Conditions médicales</legend>
            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  { key: 'has_asmathic', label: 'Asthmatique' },
                  { key: 'has_bronchite_chronique', label: 'Bronchite chronique' },
                  { key: 'has_diabete', label: 'Diabète' },
                  { key: 'has_hypertension', label: 'Hypertension' },
                  { key: 'has_allergies', label: 'Allergies' },
                  { key: 'has_migraine', label: 'Migraine' },
                ] as const
              ).map(({ key, label }) => (
                <label key={key} className="flex items-center text-base">
                  <input
                    type="checkbox"
                    name={key}
                    checked={(formData as any)[key]}
                    onChange={handleChange}
                    className="h-5 w-5 mr-2"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 py-3 px-6 bg-gray-300 text-gray-900 rounded-md text-base hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading || (!!newPassword && newPassword !== confirmPassword)}
            className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-md text-base hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
