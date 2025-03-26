import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Dark Matter Galaxy Simulation
        </h1>
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-lg">
            Welcome to DarkVader, an interactive visualization of dark matter's
            effects on galaxy rotation curves. This project demonstrates how dark
            matter influences the motion of stars in galaxies, particularly in the
            outer regions where its effects become most apparent.
          </p>
          <p className="text-lg">
            The simulation shows a simplified model of a galaxy where:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Stars orbit around a central mass</li>
            <li>Dark matter creates a halo that affects orbital velocities</li>
            <li>Outer stars move faster than predicted by Newtonian physics</li>
          </ul>
          <div className="mt-8 text-center">
            <a
              href="/simulation"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              View Simulation
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
