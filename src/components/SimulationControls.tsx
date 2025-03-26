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
    <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-white shadow-2xl shadow-blue-500/5">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl" />
      <div className="relative">
        <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
          Simulation Controls
        </h3>
        <div className="space-y-8">
          <div className="group">
            <label className="block text-sm font-medium text-gray-300 mb-3 group-hover:text-blue-400 transition-colors">
              Dark Matter Mass (10^10 M☉)
            </label>
            <div className="relative">
              <input
                type="range"
                min="1"
                max="100"
                value={darkMatterMass}
                onChange={(e) => onDarkMatterMassChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer accent-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500/20 px-3 py-1 rounded-full text-sm text-blue-400 border border-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {darkMatterMass.toFixed(1)}
              </div>
            </div>
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-gray-300 mb-3 group-hover:text-blue-400 transition-colors">
              Galaxy Mass (10^10 M☉)
            </label>
            <div className="relative">
              <input
                type="range"
                min="1"
                max="50"
                value={galaxyMass}
                onChange={(e) => onGalaxyMassChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer accent-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500/20 px-3 py-1 rounded-full text-sm text-blue-400 border border-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {galaxyMass.toFixed(1)}
              </div>
            </div>
          </div>

          <div className="group">
            <label className="block text-sm font-medium text-gray-300 mb-3 group-hover:text-blue-400 transition-colors">
              Dark Matter Ratio
            </label>
            <div className="relative">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={darkMatterRatio}
                onChange={(e) => onDarkMatterRatioChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer accent-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              />
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500/20 px-3 py-1 rounded-full text-sm text-blue-400 border border-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {(darkMatterRatio * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 