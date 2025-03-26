'use client';

interface SimulationControlsProps {
  darkMatterMass: number;
  galaxyMass: number;
  darkMatterRatio: number;
  onDarkMatterMassChange: (value: number) => void;
  onGalaxyMassChange: (value: number) => void;
  onDarkMatterRatioChange: (value: number) => void;
}

export default function SimulationControls({
  darkMatterMass,
  galaxyMass,
  darkMatterRatio,
  onDarkMatterMassChange,
  onGalaxyMassChange,
  onDarkMatterRatioChange,
}: SimulationControlsProps) {
  return (
    <div className="absolute top-4 right-4 bg-gray-800/80 p-4 rounded-lg backdrop-blur-sm text-white">
      <h3 className="text-lg font-bold mb-4">Simulation Controls</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Dark Matter Mass (10^10 M☉)</label>
          <input
            type="range"
            min="1"
            max="100"
            value={darkMatterMass}
            onChange={(e) => onDarkMatterMassChange(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm">{darkMatterMass.toFixed(1)}</div>
        </div>
        <div>
          <label className="block text-sm mb-1">Galaxy Mass (10^10 M☉)</label>
          <input
            type="range"
            min="1"
            max="50"
            value={galaxyMass}
            onChange={(e) => onGalaxyMassChange(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm">{galaxyMass.toFixed(1)}</div>
        </div>
        <div>
          <label className="block text-sm mb-1">Dark Matter Ratio</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={darkMatterRatio}
            onChange={(e) => onDarkMatterRatioChange(Number(e.target.value))}
            className="w-full"
          />
          <div className="text-sm">{(darkMatterRatio * 100).toFixed(1)}%</div>
        </div>
      </div>
    </div>
  );
} 