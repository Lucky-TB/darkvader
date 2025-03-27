'use client';

import Navbar from '@/components/Navbar';
import VelocityGraph from '@/components/VelocityGraph';
import { useGalaxy } from '@/context/GalaxyContext';

export default function DataPage() {
  const { params } = useGalaxy();

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />
      <Navbar />
      <div className="container mx-auto px-4 py-12 pt-32">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Velocity Analysis
          </h1>
          
          <div className="card mb-12">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl" />
            <div className="relative space-y-12">
              <section className="group">
                <h2 className="text-3xl font-bold mb-6 text-blue-400 group-hover:text-blue-300 transition-colors">
                  Galaxy Rotation Curves
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg mb-8">
                  This visualization shows the relationship between orbital velocity and distance from the galactic center.
                  The data demonstrates how dark matter affects the rotation curves of galaxies:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <li className="flex items-center space-x-4 p-6 rounded-xl bg-black/20 border border-white/5 group-hover:border-blue-500/30 transition-colors">
                    <span className="text-2xl text-blue-400">•</span>
                    <span className="text-lg">Expected velocity (without dark matter)</span>
                  </li>
                  <li className="flex items-center space-x-4 p-6 rounded-xl bg-black/20 border border-white/5 group-hover:border-purple-500/30 transition-colors">
                    <span className="text-2xl text-purple-400">•</span>
                    <span className="text-lg">Actual velocity (with dark matter)</span>
                  </li>
                </ul>
              </section>

              <section className="group">
                <h2 className="text-3xl font-bold mb-6 text-blue-400 group-hover:text-blue-300 transition-colors">
                  Interactive Graph
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg mb-8">
                  Use the graph below to explore how dark matter affects galactic rotation curves.
                  The data shows the discrepancy between predicted and observed velocities:
                </p>
                <div className="p-6 rounded-xl bg-black/20 border border-white/5 group-hover:border-blue-500/30 transition-colors">
                  <VelocityGraph {...params} />
                </div>
              </section>

              <section className="group">
                <h2 className="text-3xl font-bold mb-6 text-blue-400 group-hover:text-blue-300 transition-colors">
                  Key Findings
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <li className="flex items-center space-x-4 p-6 rounded-xl bg-black/20 border border-white/5 group-hover:border-green-500/30 transition-colors">
                    <span className="text-2xl text-green-400">•</span>
                    <span className="text-lg">Outer regions show higher velocities than predicted</span>
                  </li>
                  <li className="flex items-center space-x-4 p-6 rounded-xl bg-black/20 border border-white/5 group-hover:border-yellow-500/30 transition-colors">
                    <span className="text-2xl text-yellow-400">•</span>
                    <span className="text-lg">Dark matter halo extends beyond visible matter</span>
                  </li>
                  <li className="flex items-center space-x-4 p-6 rounded-xl bg-black/20 border border-white/5 group-hover:border-green-500/30 transition-colors">
                    <span className="text-2xl text-blue-400">•</span>
                    <span className="text-lg">Rotation curves remain flat at large distances</span>
                  </li>
                  <li className="flex items-center space-x-4 p-6 rounded-xl bg-black/20 border border-white/5 group-hover:border-purple-500/30 transition-colors">
                    <span className="text-2xl text-purple-400">•</span>
                    <span className="text-lg">Dark matter distribution affects overall dynamics</span>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 