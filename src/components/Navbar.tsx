'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link 
            href="/" 
            className="group flex items-center space-x-3 text-2xl font-bold"
          >
            <span className="text-4xl transform group-hover:rotate-180 transition-transform duration-500">🌌</span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              DarkVader
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className={`relative px-6 py-2 rounded-full transition-all duration-300 group ${
                isActive('/')
                  ? 'text-white bg-blue-500/20 border border-blue-500/30'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span className="relative z-10">Home</span>
              {!isActive('/') && (
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </Link>
            <Link
              href="/simulation"
              className={`relative px-6 py-2 rounded-full transition-all duration-300 group ${
                isActive('/simulation')
                  ? 'text-white bg-blue-500/20 border border-blue-500/30'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span className="relative z-10">Simulation</span>
              {!isActive('/simulation') && (
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </Link>
            <Link
              href="/simulation/data"
              className={`relative px-6 py-2 rounded-full transition-all duration-300 group ${
                isActive('/simulation/data')
                  ? 'text-white bg-blue-500/20 border border-blue-500/30'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <span className="relative z-10">Data</span>
              {!isActive('/simulation/data') && (
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 