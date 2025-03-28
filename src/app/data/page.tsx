'use client';

import VelocityGraph from '@/components/VelocityGraph';
import { useGalaxy } from '@/context/GalaxyContext';

export default function DataPage() {
  const { params } = useGalaxy();

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center">Galaxy Rotation Curve</h1>
        
        <div className="space-y-8">
          <div className="bg-black/50 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Velocity vs Distance</h2>
            <p className="text-gray-300 mb-4">
              This graph shows the rotation curve of the galaxy. The green line shows the expected velocity without dark matter 
              (following Keplerian dynamics), while the purple line shows the observed velocity including dark matter&apos;s effect. 
              The flat rotation curve at large distances is evidence for dark matter.
            </p>
            <VelocityGraph
              darkMatterMass={params.darkMatterMass}
              normalMatterMass={params.normalMatterMass}
              blackHoleMass={params.blackHoleMass}
            />
          </div>

          <div className="bg-black/50 p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Scientific Explanation</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                In a galaxy without dark matter, we would expect the rotation velocity to decrease with distance from the center 
                (Keplerian decline, v ∝ 1/√r). This is shown by the green line.
              </p>
              <p>
                However, actual observations of galaxies (purple line) show that the rotation velocity remains roughly constant 
                at large distances. This discrepancy between expected and observed velocities provides strong evidence for the 
                existence of dark matter.
              </p>
              <p>
                The total rotation curve combines contributions from:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Central black hole (dominates in inner region)</li>
                <li>Visible matter disk (peaks in middle region)</li>
                <li>Dark matter halo (dominates in outer region)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 