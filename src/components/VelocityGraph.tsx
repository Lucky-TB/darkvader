'use client';

import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Constants based on real astronomical data
const SOLAR_MASS = 1.989e30; // kg
const PARSEC = 3.086e16; // meters
const G = 6.674e-11; // gravitational constant
const KPC_TO_PARSEC = 1000; // 1 kpc = 1000 parsec

interface VelocityGraphProps {
  darkMatterMass: number;
  normalMatterMass: number;
  blackHoleMass: number;
  darkMatterRatio: number;
}

function calculateVelocities(distance: number, params: VelocityGraphProps) {
  // Skip calculation for distance = 0 to avoid division by zero
  if (distance === 0) return { expected: 0, actual: 0, bulge: 0, disk: 0, halo: 0 };

  // Convert distance to meters
  const r = distance * KPC_TO_PARSEC * PARSEC;
  
  // Convert masses to kg
  const dmMass = params.darkMatterMass * SOLAR_MASS;
  const nmMass = params.normalMatterMass * SOLAR_MASS;
  const bhMass = params.blackHoleMass * SOLAR_MASS;

  // Bulge contribution (de Vaucouleurs profile)
  const bulgeEffectiveRadius = 0.5 * KPC_TO_PARSEC * PARSEC; // Typical bulge size
  const bulgeMass = nmMass * 0.2; // About 20% of visible mass in bulge
  const bulgeVelocity = Math.sqrt((G * bulgeMass) / r) * 
    Math.exp(-7.669 * (Math.pow(r/bulgeEffectiveRadius, 0.25) - 1));
  
  // Disk contribution (exponential disk)
  const diskMass = nmMass * 0.8; // About 80% of visible mass in disk
  const diskScaleLength = 3 * KPC_TO_PARSEC * PARSEC;
  const x = r / (2 * diskScaleLength);
  // Better Bessel function approximation
  const I0K0 = (1 / (1 + 0.5*x*x)); // I0*K0 approximation
  const I1K1 = (1 / (2 + x*x));     // I1*K1 approximation
  const diskVelocity = Math.sqrt((G * diskMass * x * x * (I0K0 - I1K1)) / r);

  // Dark matter halo contribution (NFW profile)
  const rs = 20 * KPC_TO_PARSEC * PARSEC; // Scale radius
  const rho0 = dmMass / (4 * Math.PI * Math.pow(rs, 3)); // Characteristic density
  const haloVelocity = Math.sqrt((4 * Math.PI * G * rho0 * Math.pow(rs, 3) / r) * 
    (Math.log(1 + r/rs) - (r/rs)/(1 + r/rs)));

  // Total velocities
  const expectedV = Math.sqrt(bulgeVelocity * bulgeVelocity + diskVelocity * diskVelocity);
  const actualV = Math.sqrt(expectedV * expectedV + haloVelocity * haloVelocity);

  return {
    expected: expectedV / 1000000, // Convert to thousands of km/s
    actual: actualV / 1000000,     // Convert to thousands of km/s
  };
}

export default function VelocityGraph({ darkMatterMass, normalMatterMass, blackHoleMass, darkMatterRatio }: VelocityGraphProps) {
  const data = useMemo(() => {
    const points = [];
    for (let r = 0; r <= 20; r += 0.25) {
      const velocities = calculateVelocities(r, { 
        darkMatterMass, 
        normalMatterMass, 
        blackHoleMass, 
        darkMatterRatio 
      });
      points.push({
        distance: r,
        expected: velocities.expected,
        actual: velocities.actual,
      });
    }
    return points;
  }, [darkMatterMass, normalMatterMass, blackHoleMass, darkMatterRatio]);

  return (
    <div className="w-full h-full bg-black/50 p-4 rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid stroke="#ffffff20" />
          <XAxis
            dataKey="distance"
            stroke="#ffffff80"
            label={{ value: 'Distance (kpc)', position: 'bottom', fill: '#ffffff80' }}
            domain={[0, 20]}
          />
          <YAxis
            stroke="#ffffff80"
            label={{ value: 'Velocity (thousands of km/s)', angle: -90, position: 'left', fill: '#ffffff80' }}
            domain={[0, 'auto']}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#ffffff' }}
            formatter={(value: number) => `${(value * 1000).toFixed(0)} km/s`}
            labelFormatter={(value: number) => `Distance: ${value} kpc`}
          />
          <Legend
            wrapperStyle={{
              paddingTop: '20px',
              color: '#ffffff80',
            }}
          />
          <Line
            type="monotone"
            dataKey="expected"
            stroke="#4CAF50"
            strokeWidth={2}
            dot={false}
            name="Expected (No Dark Matter)"
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#9C27B0"
            strokeWidth={2}
            dot={false}
            name="Observed (With Dark Matter)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 