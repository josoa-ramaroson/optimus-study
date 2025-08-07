"use client"
import History from '@/components/History'
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

export default function HistoryPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/dashboard');
  }, [user, router]);

  return (
    <>
    <History />
    </>
  )
}
