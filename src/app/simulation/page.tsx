import Navbar from '@/components/Navbar';
import GalaxySimulation from '@/components/GalaxySimulation';

export default function SimulationPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Galaxy Simulation with Dark Matter
        </h1>
        <div className="max-w-3xl mx-auto space-y-6 mb-8">
          <p className="text-lg">
            This interactive simulation demonstrates how dark matter affects the
            structure and dynamics of a galaxy. The simulation includes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>A central bulge of stars (yellow)</li>
            <li>A disk of stars (white)</li>
            <li>A dark matter halo (semi-transparent gray)</li>
            <li>Real-time velocity calculations for different regions</li>
          </ul>
          <p className="text-lg">
            You can adjust the simulation parameters using the controls in the top
            right:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Dark Matter Mass: Controls the total mass of dark matter (in 10^10 solar masses)</li>
            <li>Galaxy Mass: Controls the mass of visible matter (in 10^10 solar masses)</li>
            <li>Dark Matter Ratio: Adjusts the proportion of dark matter to total mass</li>
          </ul>
          <p className="text-lg">
            The velocity display in the top left shows the orbital velocities for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Halo Region: Outer dark matter-dominated region</li>
            <li>Disk Region: Main spiral arm region</li>
            <li>Bulge Region: Central dense region</li>
          </ul>
          <div className="mt-4 text-sm text-gray-400">
            <p>Controls:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Left mouse button: Rotate view</li>
              <li>Right mouse button: Pan</li>
              <li>Mouse wheel: Zoom in/out</li>
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <GalaxySimulation />
        </div>
      </div>
    </main>
  );
} 