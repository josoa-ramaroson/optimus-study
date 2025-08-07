"use client"

import React, { useEffect } from 'react';
import {useAuthStore} from '../../store/authStore';
import { useRouter } from 'next/navigation';
import Profile from '@/components/Profile';
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
  <>
  <Profile />
  </>
  );
}
