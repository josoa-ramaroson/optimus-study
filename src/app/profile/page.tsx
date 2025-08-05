"use client"

import React, { useEffect } from 'react';
import {useAuthStore} from '../../store/authStore';
import { useRouter } from 'next/navigation';
export default function ProfilePage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Profil de l'utilisateur</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-700">ID :</h3>
          <p className="text-gray-900">{user.id}</p>
        </div>
        <div>
          <h3 className="font-medium text-gray-700">Email :</h3>
          <p className="text-gray-900">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
