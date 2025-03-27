'use client';

interface VelocityDisplayProps {
  haloVelocity: number;
  diskVelocity: number;
  bulgeVelocity: number;
}

export default function VelocityDisplay({
  haloVelocity,
  diskVelocity,
  bulgeVelocity,
}: VelocityDisplayProps) {
  return (
    <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-white shadow-2xl shadow-blue-500/5">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl" />
      <div className="relative">
        <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
          Velocity Information
        </h3>
        <div className="space-y-6">
          <div className="group">
            <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5 group-hover:border-blue-500/30 transition-colors">
              <span className="text-gray-300 group-hover:text-blue-400 transition-colors">Halo Region</span>
              <span className="text-blue-400 font-mono text-lg">{haloVelocity.toFixed(1)} km/s</span>
            </div>
          </div>
          <div className="group">
            <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5 group-hover:border-green-500/30 transition-colors">
              <span className="text-gray-300 group-hover:text-green-400 transition-colors">Disk Region</span>
              <span className="text-green-400 font-mono text-lg">{diskVelocity.toFixed(1)} km/s</span>
            </div>
          </div>
          <div className="group">
            <div className="flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/5 group-hover:border-yellow-500/30 transition-colors">
              <span className="text-gray-300 group-hover:text-yellow-400 transition-colors">Bulge Region</span>
              <span className="text-yellow-400 font-mono text-lg">{bulgeVelocity.toFixed(1)} km/s</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 