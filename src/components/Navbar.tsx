'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-gray-900 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          DarkVader
        </Link>
        <div className="space-x-6">
          <Link
            href="/"
            className={`hover:text-blue-400 transition-colors ${
              isActive('/') ? 'text-blue-400' : ''
            }`}
          >
            Home
          </Link>
          <Link
            href="/simulation"
            className={`hover:text-blue-400 transition-colors ${
              isActive('/simulation') ? 'text-blue-400' : ''
            }`}
          >
            Simulation
          </Link>
          <Link
            href="/simulation/data"
            className={`hover:text-blue-400 transition-colors ${
              isActive('/simulation/data') ? 'text-blue-400' : ''
            }`}
          >
            Data
          </Link>
        </div>
      </div>
    </nav>
  );
} 