import Navbar from '@/components/Navbar';
import GalaxySimulation from '@/components/GalaxySimulation';

export default function SimulationPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent" />
      <Navbar />
      <div className="container mx-auto px-4 py-12 pt-32">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-6xl font-bold mb-12 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
            Galaxy Simulation with Dark Matter
          </h1>
          
          <div className="card mb-12">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl" />
            <div className="relative space-y-12">
              <section className="group">
                <h2 className="text-3xl font-bold mb-6 text-blue-400 group-hover:text-blue-300 transition-colors">
                  Simulation Overview
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg mb-8">
                  This interactive simulation demonstrates how dark matter affects the
                  structure and dynamics of a galaxy. The simulation includes:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <li className="flex items-center space-x-4 p-6 rounded-xl bg-black/20 border border-white/5 group-hover:border-yellow-500/30 transition-colors">
                    <span className="text-2xl text-yellow-400">•</span>
                    <span className="text-lg">A central bulge of stars (yellow)</span>
                  </li>
                  <li className="flex items-center space-x-4 p-6 rounded-xl bg-black/20 border border-white/5 group-hover:border-white/30 transition-colors">
                    <span className="text-2xl text-white">•</span>
                    <span className="text-lg">A disk of stars (white)</span>
                  </li>
                  <li className="flex items-center space-x-4 p-6 rounded-xl bg-black/20 border border-white/5 group-hover:border-gray-400/30 transition-colors">
                    <span className="text-2xl text-gray-400">•</span>
                    <span className="text-lg">A dark matter halo (semi-transparent gray)</span>
                  </li>
                  <li className="flex items-center space-x-4 p-6 rounded-xl bg-black/20 border border-white/5 group-hover:border-blue-500/30 transition-colors">
                    <span className="text-2xl text-blue-400">•</span>
                    <span className="text-lg">Real-time velocity calculations for different regions</span>
                  </li>
                </ul>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group p-8 rounded-xl bg-black/20 border border-white/5 group-hover:border-purple-500/30 transition-colors">
                  <h3 className="text-xl font-semibold mb-6 text-purple-400 group-hover:text-purple-300 transition-colors">
                    Simulation Parameters
                  </h3>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-center space-x-4 p-4 rounded-lg bg-black/10 border border-white/5">
                      <span className="text-blue-400">•</span>
                      <span>Dark Matter Mass (10^10 M☉)</span>
                    </li>
                    <li className="flex items-center space-x-4 p-4 rounded-lg bg-black/10 border border-white/5">
                      <span className="text-blue-400">•</span>
                      <span>Galaxy Mass (10^10 M☉)</span>
                    </li>
                    <li className="flex items-center space-x-4 p-4 rounded-lg bg-black/10 border border-white/5">
                      <span className="text-blue-400">•</span>
                      <span>Dark Matter Ratio</span>
                    </li>
                  </ul>
                </div>
                <div className="group p-8 rounded-xl bg-black/20 border border-white/5 group-hover:border-purple-500/30 transition-colors">
                  <h3 className="text-xl font-semibold mb-6 text-purple-400 group-hover:text-purple-300 transition-colors">
                    View Controls
                  </h3>
                  <ul className="space-y-4 text-gray-300">
                    <li className="flex items-center space-x-4 p-4 rounded-lg bg-black/10 border border-white/5">
                      <span className="text-blue-400">•</span>
                      <span>Left mouse button: Rotate view</span>
                    </li>
                    <li className="flex items-center space-x-4 p-4 rounded-lg bg-black/10 border border-white/5">
                      <span className="text-blue-400">•</span>
                      <span>Right mouse button: Pan</span>
                    </li>
                    <li className="flex items-center space-x-4 p-4 rounded-lg bg-black/10 border border-white/5">
                      <span className="text-blue-400">•</span>
                      <span>Mouse wheel: Zoom in/out</span>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="group">
                <h2 className="text-3xl font-bold mb-6 text-blue-400 group-hover:text-blue-300 transition-colors">
                  Velocity Information
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg mb-8">
                  The velocity display shows orbital velocities for different regions of the galaxy:
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <li className="flex items-center space-x-4 p-6 rounded-xl bg-black/20 border border-white/5 group-hover:border-blue-500/30 transition-colors">
                    <span className="text-2xl text-blue-400">•</span>
                    <span className="text-lg">Halo Region: Outer dark matter-dominated region</span>
                  </li>
                  <li className="flex items-center space-x-4 p-6 rounded-xl bg-black/20 border border-white/5 group-hover:border-green-500/30 transition-colors">
                    <span className="text-2xl text-green-400">•</span>
                    <span className="text-lg">Disk Region: Main spiral arm region</span>
                  </li>
                  <li className="flex items-center space-x-4 p-6 rounded-xl bg-black/20 border border-white/5 group-hover:border-yellow-500/30 transition-colors">
                    <span className="text-2xl text-yellow-400">•</span>
                    <span className="text-lg">Bulge Region: Central dense region</span>
                  </li>
                </ul>
              </section>
            </div>
          </div>

          <div className="mt-12">
            <GalaxySimulation />
          </div>
        </div>
      </div>
    </main>
  );
} 