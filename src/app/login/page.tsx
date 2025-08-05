'use client';

import React, { useEffect } from 'react';
import LoginForm from '@/components/LoginForm';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/dashboard');
  }, [user, router]);

  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-blue-50 to-indigo-50">
      <LoginForm />
    </div>
  );
}
