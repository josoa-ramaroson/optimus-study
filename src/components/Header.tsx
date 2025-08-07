'use client';
import React from 'react';
import { User, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  const { user } = useAuthStore();
  return (
    <header className="w-full bg-white/70 backdrop-blur-md shadow-md z-20">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4">
        <Link href="/">
          <span className="text-2xl font-bold text-blue-700 cursor-pointer">StudyMonitor</span>
        </Link>
        {user?(<Nav />) :<></>}
        {user ? (
          <div className="flex items-center space-x-4">
            <Link href="/profile">
              <span className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition cursor-pointer">
                <User size={24} />
                <span>{user.username}</span>
              </span>
            </Link>
          
          </div>
        ) : (
          <Link href="/login">
            <span className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer">
              Connexion
            </span>
          </Link>
        )}
      </div>
    </header>
  );
}