// src/app/layout.tsx
import './globals.css';  // ou '@/styles/globals.css' selon ton chemin
import Header from '@/components/Header';

export const metadata = {
  title: 'Study Environment Monitor',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 bg-gray-100 p-4 lg:pl-64 lg:pr-64">{children}</main>
      </body>
    </html>
  );
}
