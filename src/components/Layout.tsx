"use client"

import React from 'react';
import Header from './Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header />
      <main className="p-6"> {children} </main>
    </div>
  );
}