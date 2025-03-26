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
    <div className="absolute top-4 left-4 bg-gray-800/80 p-4 rounded-lg backdrop-blur-sm text-white">
      <h3 className="text-lg font-bold mb-4">Velocity Information</h3>
      <div className="space-y-2">
        <div>
          <span className="text-blue-400">Halo Region:</span>
          <span className="ml-2">{haloVelocity.toFixed(1)} km/s</span>
        </div>
        <div>
          <span className="text-green-400">Disk Region:</span>
          <span className="ml-2">{diskVelocity.toFixed(1)} km/s</span>
        </div>
        <div>
          <span className="text-yellow-400">Bulge Region:</span>
          <span className="ml-2">{bulgeVelocity.toFixed(1)} km/s</span>
        </div>
      </div>
    </div>
  );
} 