'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useGalaxy } from '@/context/GalaxyContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSpinner from '@/components/LoadingSpinner';

// Loading component for graphs
const GraphLoader = () => (
  <div className="w-full h-[500px] bg-black/30 rounded-lg flex items-center justify-center">
    <LoadingSpinner />
  </div>
);

// Dynamically import the graph components with no SSR
const WIMPFluxGraph = dynamic(() => import('@/components/WIMPFluxGraph'), {
  ssr: false,
  loading: GraphLoader
});

const MONDRotationCurve = dynamic(() => import('@/components/MONDRotationCurve'), {
  ssr: false,
  loading: GraphLoader
});

// Error fallback component
const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div className="w-full h-[500px] bg-black/30 rounded-lg flex flex-col items-center justify-center p-4">
    <div className="text-red-500 text-center mb-4">
      <p className="mb-2">Error loading simulation:</p>
      <p>{error.message}</p>
    </div>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Try Again
    </button>
  </div>
);

// Main page component
export default function AnalysisPage() {
  const { params } = useGalaxy();
  const [activeTab, setActiveTab] = useState<'wimp' | 'mond'>('wimp');

  // Calculate values for the explanations
  const totalMass = (params.darkMatterMass + params.normalMatterMass) / 1e12; // in 10¹² M☉
  const darkMatterFraction = params.darkMatterMass / (params.darkMatterMass + params.normalMatterMass) * 100;
  const expectedFlux = 1e-12 * (params.darkMatterMass / 1e12) * (params.darkMatterRatio) * (100 / params.normalMatterMass);
  const transitionRadius = Math.sqrt(params.normalMatterMass / 1e11) * 5; // kpc
  const peakVelocity = Math.sqrt((6.67e-11 * params.darkMatterMass * 2e30) / (20 * 3.086e19)) / 1000; // km/s
  const isDetectableByFermi = expectedFlux > 3e-12;
  const galaxyType = params.darkMatterRatio > 0.8 ? 'early-type (Sa)' : 
                    params.darkMatterRatio > 0.6 ? 'intermediate-type (Sb)' : 'late-type (Sc)';

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
          Advanced Dark Matter Analysis
        </h1>
        
        <div className="space-y-8">
          {/* Tab Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setActiveTab('wimp')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeTab === 'wimp'
                  ? 'bg-blue-500/20 border border-blue-500/30 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              WIMP Annihilation
            </button>
            <button
              onClick={() => setActiveTab('mond')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                activeTab === 'mond'
                  ? 'bg-blue-500/20 border border-blue-500/30 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              MOND Analysis
            </button>
          </div>

          {/* Content */}
          {activeTab === 'wimp' && (
            <div className="space-y-8">
              <div className="bg-black/50 p-6 rounded-xl border border-white/10">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">WIMP Annihilation Gamma-Ray Flux</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  This simulation shows the predicted gamma-ray flux from WIMP dark matter annihilation 
                  in your galaxy&apos;s halo, compared with Fermi-LAT observational limits.
                </p>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <WIMPFluxGraph
                    darkMatterMass={params.darkMatterMass}
                    darkMatterRatio={params.darkMatterRatio}
                  />
                </ErrorBoundary>
                <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3">Understanding Your Galaxy&apos;s Dark Matter Signature</h3>
                  <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-blue-300">Galaxy Properties</h4>
                        <p>
                          Your {galaxyType} galaxy contains {totalMass.toFixed(2)} × 10¹² M☉ total mass, 
                          with dark matter comprising {darkMatterFraction.toFixed(1)}% of this mass. This dark matter 
                          fraction is {darkMatterFraction > 85 ? 'higher than' : darkMatterFraction < 75 ? 'lower than' : 'typical of'} most 
                          spiral galaxies.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-blue-300">Gamma-Ray Predictions</h4>
                        <p>
                          At 10 kpc from the galactic center, we predict a gamma-ray flux of {expectedFlux.toExponential(2)} photons/cm²/s. 
                          This flux is {isDetectableByFermi ? 'potentially detectable' : 'below the detection threshold'} by 
                          the Fermi-LAT telescope.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-blue-300">Understanding the Graph</h4>
                      <p>
                        The purple line shows how the gamma-ray flux from dark matter annihilation varies with distance. 
                        Your galaxy&apos;s profile shows a {params.darkMatterRatio > 0.7 ? 'steep' : 'gradual'} decline, 
                        indicating a {params.darkMatterRatio > 0.7 ? 'concentrated' : 'diffuse'} dark matter halo. This 
                        is characteristic of {params.darkMatterRatio > 0.7 ? 'older, more evolved' : 'younger'} galaxies.
                      </p>
                      <p>
                        The red dashed line represents Fermi-LAT&apos;s detection limit. Regions where the purple line 
                        exceeds this limit ({isDetectableByFermi ? 'present in your galaxy' : 'not seen in your galaxy'}) 
                        are potential targets for dark matter indirect detection experiments.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-blue-300">Scientific Significance</h4>
                      <p>
                        This analysis provides crucial constraints on dark matter particle properties. Your galaxy&apos;s 
                        {isDetectableByFermi ? 'strong gamma-ray signal suggests a more massive or concentrated dark matter halo' 
                        : 'weak gamma-ray signal might indicate a less concentrated halo or different dark matter properties'}. 
                        These predictions can be tested against actual gamma-ray observations to validate dark matter models.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'mond' && (
            <div className="space-y-8">
              <div className="bg-black/50 p-6 rounded-xl border border-white/10">
                <h2 className="text-2xl font-bold mb-4 text-blue-400">MOND Rotation Curve Analysis</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Modified Newtonian Dynamics (MOND) attempts to explain galaxy rotation curves without 
                  dark matter by modifying gravity at low accelerations.
                </p>
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                  <MONDRotationCurve
                    normalMatterMass={params.normalMatterMass}
                    blackHoleMass={params.blackHoleMass}
                    darkMatterMass={params.darkMatterMass}
                    darkMatterRatio={params.darkMatterRatio}
                  />
                </ErrorBoundary>
                <div className="mt-6 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">Comparing Dark Matter vs. MOND in Your Galaxy</h3>
                  <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-purple-300">Rotation Curve Analysis</h4>
                        <p>
                          Your galaxy shows a peak rotation velocity of {peakVelocity.toFixed(0)} km/s at large radii. 
                          Under Newtonian gravity, velocities should decline as v ∝ 1/√r (blue line), but 
                          your galaxy maintains elevated speeds, reaching {(peakVelocity * 0.9).toFixed(0)} km/s even at 
                          20 kpc.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-purple-300">Mass Discrepancy</h4>
                        <p>
                          The visible mass ({(params.normalMatterMass / 1e11).toFixed(1)} × 10¹¹ M☉) alone cannot explain 
                          these velocities. Dark matter models resolve this by adding {darkMatterFraction.toFixed(1)}% invisible mass, 
                          while MOND modifies gravity itself.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-purple-300">Understanding the Graph</h4>
                      <p>
                        The transition from Newtonian to MONDian behavior occurs at {transitionRadius.toFixed(1)} kpc, where 
                        acceleration drops below a₀ ≈ 1.2 × 10⁻¹⁰ m/s². This radius marks where your galaxy&apos;s behavior 
                        most strongly challenges conventional gravity.
                      </p>
                      <p>
                        The red dots show simulated observations with realistic uncertainties. Their scatter of 
                        {(peakVelocity * 0.05).toFixed(0)} km/s matches typical observational errors in real galaxies.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-semibold text-purple-300">Implications</h4>
                      <p>
                        Your galaxy&apos;s rotation curve is {darkMatterFraction > 85 ? 'strongly' : 'moderately'} inconsistent 
                        with Newtonian gravity. While dark matter explains this through a massive halo, MOND achieves similar 
                        results by modifying gravity at accelerations below a₀. The {params.darkMatterRatio > 0.7 ? 'strong' : 'moderate'} 
                        discrepancy in your galaxy makes it a {params.darkMatterRatio > 0.7 ? 'compelling' : 'useful'} test case for 
                        distinguishing between these theories.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 