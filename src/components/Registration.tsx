import React, { useState } from 'react';

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

// Données d'inscription (sans userId, généré par le backend)
export type RegistrationData = Omit<IUserInfo, 'userId'>;

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationData>({
    username: '',
    email: '',
    has_asmathic: false,
    has_bronchite_chronique: false,
    has_diabete: false,
    has_hypertension: false,
    has_allergies: false,
    has_migraine: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('Échec de l\'inscription');
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) return <div className="p-4 text-green-600">Inscription réussie !</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Inscription</h1>
      {error && <div className="mb-4 text-red-600">Erreur : {error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Nom d'utilisateur</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block w-full border rounded p-2"
            required
          />
        </div>

        <fieldset className="border p-4 rounded">
          <legend className="font-medium">Conditions médicales (facultatif)</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
              <label key={key} className="flex items-center">
                <input
                  type="checkbox"
                  name={key}
                  checked={formData[key] as boolean}
                  onChange={handleChange}
                  className="mr-2"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'En cours...' : 'S\'inscrire'}
        </button>
      </form>
    </div>
  );
};

export default Registration;
