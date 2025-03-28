'use client';

import dynamic from 'next/dynamic';
import VelocityDisplay from '@/components/VelocityDisplay';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorBoundary from '@/components/ErrorBoundary';
import { useGalaxy } from '@/context/GalaxyContext';

// Custom error fallback for the simulation
const SimulationErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div className="aspect-square w-full rounded-lg bg-black/30 flex flex-col items-center justify-center p-8">
    <div className="text-center space-y-4">
      <div className="text-4xl mb-4">🌌</div>
      <h3 className="text-xl font-space text-purple-500">Oops! The simulation encountered an error</h3>
      <p className="text-gray-400 max-w-md mx-auto mb-4">
        {error.message || "We had trouble initializing the galaxy simulation. This might be due to WebGL not being available or supported by your browser."}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-500 rounded-lg transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
);

// Custom loading component for the simulation
const SimulationLoading = () => (
  <div className="aspect-square w-full rounded-lg bg-black/30 flex flex-col items-center justify-center p-8">
    <LoadingSpinner />
    <p className="text-purple-500 mt-4 font-space">Initializing Galaxy Simulation...</p>
  </div>
);

// Dynamically import the GalaxySimulation component with custom loading
const GalaxySimulation = dynamic(() => import('@/components/GalaxySimulation'), {
  loading: () => <SimulationLoading />,
  ssr: false,
});

export default function SimulationPage() {
  const { params, setParams } = useGalaxy();

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 pt-24 pb-8">
        <h1 className="text-4xl md:text-5xl font-space font-bold text-center mb-12 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Galaxy Simulation with Dark Matter
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Simulation Area */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <section className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-space font-bold mb-4 text-purple-500">3D Galaxy Visualization</h2>
              <div className="aspect-square w-full rounded-lg overflow-hidden">
                <ErrorBoundary FallbackComponent={SimulationErrorFallback}>
                  <GalaxySimulation {...params} />
                </ErrorBoundary>
              </div>
            </section>

            {/* About Section */}
            <section className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-space font-bold mb-6 text-purple-500">About the Simulation</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-space font-semibold mb-3 text-blue-500">What You're Seeing</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-yellow-500">●</span> Yellow: Central bulge
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-blue-500">●</span> Blue: Galactic disk
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-purple-500">●</span> Purple: Dark matter halo
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-space font-semibold mb-3 text-blue-500">How to Interact</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">↔️</span> Drag to rotate view
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">🖱️</span> Scroll to zoom
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-500">⚙️</span> Use sliders to adjust parameters
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Galaxy Parameters */}
            <section className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-space font-bold mb-6 text-purple-500">Galaxy Parameters</h2>
              <div className="bg-[#111111] rounded-xl p-6 space-y-6">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Dark Matter Mass (10¹² M☉)</label>
                  <input
                    type="range"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={params.darkMatterMass / 1e12}
                    onChange={(e) => setParams({ 
                      ...params, 
                      darkMatterMass: parseFloat(e.target.value) * 1e12 
                    })}
                    className="w-full h-1 bg-gray-800 rounded-full appearance-none cursor-pointer accent-blue-500"
                  />
                  <span className="text-xs text-blue-400 mt-1 block">{(params.darkMatterMass / 1e12).toFixed(1)}</span>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Normal Matter Mass (10¹¹ M☉)</label>
                  <input
                    type="range"
                    min="0.1"
                    max="10"
                    step="0.1"
                    value={params.normalMatterMass / 1e11}
                    onChange={(e) => setParams({ 
                      ...params, 
                      normalMatterMass: parseFloat(e.target.value) * 1e11 
                    })}
                    className="w-full h-1 bg-gray-800 rounded-full appearance-none cursor-pointer accent-blue-500"
                  />
                  <span className="text-xs text-blue-400 mt-1 block">{(params.normalMatterMass / 1e11).toFixed(1)}</span>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Black Hole Mass (10⁶ M☉)</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    step="1"
                    value={params.blackHoleMass / 1e6}
                    onChange={(e) => setParams({ 
                      ...params, 
                      blackHoleMass: parseFloat(e.target.value) * 1e6 
                    })}
                    className="w-full h-1 bg-gray-800 rounded-full appearance-none cursor-pointer accent-blue-500"
                  />
                  <span className="text-xs text-blue-400 mt-1 block">{(params.blackHoleMass / 1e6).toFixed(0)}</span>
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">Dark Matter Ratio</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={params.darkMatterRatio}
                    onChange={(e) => setParams({ 
                      ...params, 
                      darkMatterRatio: parseFloat(e.target.value) 
                    })}
                    className="w-full h-1 bg-gray-800 rounded-full appearance-none cursor-pointer accent-blue-500"
                  />
                  <span className="text-xs text-blue-400 mt-1 block">{(params.darkMatterRatio * 100).toFixed(0)}%</span>
                </div>
              </div>
            </section>

            {/* Velocity Section */}
            <section className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-space font-bold mb-6 text-purple-500">Velocity Information</h2>
              <VelocityDisplay
                haloVelocity={Math.sqrt((6.67e-11 * params.darkMatterMass * 2e30) / (20 * 3.086e19)) / 1000}
                diskVelocity={Math.sqrt((6.67e-11 * (params.normalMatterMass + params.darkMatterMass * 0.8) * 2e30) / (15 * 3.086e19)) / 1000}
                bulgeVelocity={Math.sqrt((6.67e-11 * (params.blackHoleMass + params.normalMatterMass * 0.2) * 2e30) / (5 * 3.086e19)) / 1000}
              />
            </section>

            {/* Scientific Data Panel */}
            <section className="bg-black/40 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h2 className="text-xl font-space font-bold mb-6 text-purple-500">Scientific Data</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-space font-semibold text-blue-400">Total Mass</h3>
                  <p className="text-lg text-white">
                    {((params.darkMatterMass + params.normalMatterMass + params.blackHoleMass) / 1e12).toFixed(2)} × 10¹² M☉
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-space font-semibold text-blue-400">Galaxy Radius</h3>
                  <p className="text-lg text-white">
                    {(Math.sqrt(params.darkMatterMass / 1e12) * 30).toFixed(1)} kpc
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-space font-semibold text-blue-400">Galaxy Type</h3>
                  <p className="text-lg text-white">
                    {params.darkMatterRatio > 0.8 ? 'Sa (Early Spiral)' : 
                     params.darkMatterRatio > 0.6 ? 'Sb (Intermediate Spiral)' : 'Sc (Late Spiral)'}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-space font-semibold text-blue-400">Orbital Period (at 20 kpc)</h3>
                  <p className="text-lg text-white">
                    {(2 * Math.PI * 20 * 3.086e19 / (250 * 1000) / (3.156e7 * 1e6)).toFixed(2)} Myr
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
} 