import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ClientSpaceBackground from '@/components/ClientSpaceBackground';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      <ClientSpaceBackground />
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-24">
            <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              DarkVader
            </h1>
            <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Explore the mysteries of dark matter through interactive galaxy simulations and data visualization
            </p>
            <Link
              href="/simulation"
              className="inline-block px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-lg font-semibold text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/20"
            >
              Launch Simulation
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
            <div className="group p-8 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 hover:border-blue-500/30 transition-all duration-300">
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🌌</div>
              <h3 className="text-xl font-bold mb-4 text-blue-400">Interactive Simulation</h3>
              <p className="text-gray-300 leading-relaxed">
                Manipulate dark matter parameters and observe real-time effects on galaxy rotation curves
              </p>
            </div>
            <div className="group p-8 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300">
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">📊</div>
              <h3 className="text-xl font-bold mb-4 text-purple-400">Data Analysis</h3>
              <p className="text-gray-300 leading-relaxed">
                Visualize and analyze the relationship between dark matter and galactic dynamics
              </p>
            </div>
            <div className="group p-8 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 hover:border-pink-500/30 transition-all duration-300">
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">🔬</div>
              <h3 className="text-xl font-bold mb-4 text-pink-400">Scientific Insights</h3>
              <p className="text-gray-300 leading-relaxed">
                Understand the role of dark matter in shaping the universe's structure
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Ready to Explore?
            </h2>
            <div className="flex justify-center space-x-6">
              <Link
                href="/simulation"
                className="px-8 py-3 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-400 hover:bg-blue-500/30 transition-all duration-300"
              >
                Start Simulation
              </Link>
              <Link
                href="/simulation/data"
                className="px-8 py-3 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-400 hover:bg-purple-500/30 transition-all duration-300"
              >
                View Data
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
