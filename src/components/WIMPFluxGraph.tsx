'use client';

import { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface WIMPFluxGraphProps {
  darkMatterMass: number;  // in solar masses
}

export default function WIMPFluxGraph({ darkMatterMass }: WIMPFluxGraphProps) {
  // Constants
  const WIMP_MASS = 100; // GeV
  const ANNIHILATION_CROSS_SECTION = 3e-26; // cm³/s (thermal relic value)
  const SOLAR_MASS = 2e30; // kg
  const PARSEC = 3.086e16; // meters
  const FERMI_LAT_SENSITIVITY = 3e-12; // ph/cm²/s (approximate Fermi-LAT sensitivity)
  
  // Calculate data points for the graph
  const data = useMemo(() => {
    const points: { distance: number; predictedFlux: number; fermiLimit: number }[] = [];
    
    // Calculate points from 0.1 kpc to 100 kpc
    for (let r = 0.1; r <= 100; r *= 1.2) {
      // NFW profile parameters
      const rs = 20; // scale radius in kpc
      const rho0 = (darkMatterMass * SOLAR_MASS) / (4 * Math.PI * Math.pow(rs * PARSEC, 3));
      
      // Calculate NFW density at radius r
      const x = r / rs;
      const rho = rho0 / (x * Math.pow(1 + x, 2));
      
      // J-factor calculation (simplified)
      const jFactor = 2 * Math.PI * Math.pow(rho, 2) * r * PARSEC;
      
      // Predicted gamma-ray flux
      const predictedFlux = (ANNIHILATION_CROSS_SECTION * jFactor) / 
        (8 * Math.PI * Math.pow(WIMP_MASS, 2));
      
      points.push({
        distance: r,
        predictedFlux: predictedFlux * 1e12, // Convert to 10⁻¹² ph/cm²/s
        fermiLimit: FERMI_LAT_SENSITIVITY * 1e12
      });
    }
    
    return points;
  }, [darkMatterMass]);

  return (
    <div className="w-full h-[500px] bg-black/30 rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="distance"
            type="number"
            scale="log"
            domain={[0.1, 100]}
            tick={{ fill: '#fff' }}
            label={{ value: 'Distance from Galactic Center (kpc)', fill: '#fff', dy: 20 }}
          />
          <YAxis
            type="number"
            scale="log"
            domain={[1e-3, 1e3]}
            tick={{ fill: '#fff' }}
            label={{ 
              value: 'Gamma-ray Flux (10⁻¹² ph/cm²/s)', 
              angle: -90, 
              fill: '#fff',
              dx: -40 
            }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
            labelStyle={{ color: '#fff' }}
            formatter={(value: number) => [
              `${value.toExponential(2)} × 10⁻¹² ph/cm²/s`,
              'Flux'
            ]}
            labelFormatter={(value) => `Distance: ${Number(value).toFixed(1)} kpc`}
          />
          <Legend />
          <Line
            name="Predicted WIMP Flux"
            type="monotone"
            dataKey="predictedFlux"
            stroke="#8884d8"
            dot={false}
          />
          <Line
            name="Fermi-LAT Limit"
            type="monotone"
            dataKey="fermiLimit"
            stroke="#ff4444"
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 