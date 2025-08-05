"use client"

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Settings, LogOut, Menu, X, SmartphoneIcon, ActivityIcon, HistoryIcon } from 'lucide-react';

export default function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { href: '/dashboard/sensors_list', label: 'Liste des capteurs', icon: <ActivityIcon size={18} /> },
    { href: '/dashboard/history', label: 'Historique', icon: <HistoryIcon size={18} /> },
    
];

  const toggleMenu = () => setIsOpen(prev => !prev);

  return (
    <>
      {/* Top bar */}
      <nav className="bg-white  px-6 py-4 flex justify-between items-center">
        {/* Burger / Close button */}
        <button
          aria-label="Toggle navigation"
          onClick={toggleMenu}
          className="md:hidden"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className="hidden md:flex items-center space-x-6">
          {links.map(({ href, label, icon }) => (
            <Link key={href} href={ href}>
              <div
                className={`flex items-center space-x-2 font-medium hover:text-blue-600 transition-colors ${
                  pathname === href ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {icon}
                <span>{label}</span>
              </div>
            </Link>
          ))}

  
        </div>
      </nav>

      {/* Mobile drawer overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Mobile drawer panel */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 space-y-6">
          {links.map(({ href, label, icon }) => (
            <Link key={href} href={href}>
              <div
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 font-medium hover:text-blue-600 transition-colors ${
                  pathname === href ? 'text-blue-600' : 'text-gray-700'
                }`}
              >
                {icon}
                <span>{label}</span>
              </div>
            </Link>
          ))}

          
        </div>
      </aside>
    </>
  );
}
