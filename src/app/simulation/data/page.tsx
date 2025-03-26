import Navbar from '@/components/Navbar';
import RotationCurve from '@/components/RotationCurve';

export default function DataPage() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Galaxy Rotation Curves
        </h1>
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-lg">
            This graph shows the rotation curve of the Andromeda Galaxy (M31),
            comparing the observed orbital velocities of stars (purple line) with
            the velocities predicted by Newtonian physics (green line). The
            discrepancy between these curves provides evidence for the existence of
            dark matter.
          </p>
          <p className="text-lg">
            Key observations:
          </p>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>Observed velocities remain high at large distances</li>
            <li>Newtonian predictions show decreasing velocities</li>
            <li>The difference is attributed to dark matter's gravitational influence</li>
          </ul>
        </div>
        <div className="mt-8">
          <RotationCurve />
        </div>
      </div>
    </main>
  );
} 