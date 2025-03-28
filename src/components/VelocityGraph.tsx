'use client';

import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Constants based on real astronomical data
const SOLAR_MASS = 1.989e30; // kg
const PARSEC = 3.086e16; // meters
const G = 6.674e-11; // gravitational constant
const KPC_TO_PARSEC = 1000; // 1 kpc = 1000 parsec

function calculateVelocities(radius: number, params: { darkMatterMass: number, normalMatterMass: number, blackHoleMass: number }) {
  // Skip calculation for distance = 0
  if (radius === 0) return { expected: 0, actual: 0 };
  
  // Convert radius to meters
  const r = radius * KPC_TO_PARSEC * PARSEC;
  
  // Convert masses to kg (scale masses appropriately)
  const dmMass = params.darkMatterMass * 1e12 * SOLAR_MASS; // Convert from 10¹² solar masses
  const nmMass = params.normalMatterMass * 1e11 * SOLAR_MASS; // Convert from 10¹¹ solar masses
  const bhMass = params.blackHoleMass * 1e6 * SOLAR_MASS;  // Convert from 10⁶ solar masses

  // Bulge contribution (de Vaucouleurs profile)
  const bulgeRadius = 1 * KPC_TO_PARSEC * PARSEC; // 1 kpc typical bulge radius
  const bulgeMass = 0.2 * nmMass; // 20% of visible mass in bulge
  const vBulge = Math.sqrt((G * bulgeMass) / r) * 
    Math.exp(-7.669 * (Math.pow(r/bulgeRadius, 0.25) - 1));

  // Disk contribution (exponential disk)
  const diskMass = 0.8 * nmMass; // 80% of visible mass in disk
  const diskScaleLength = 3 * KPC_TO_PARSEC * PARSEC;
  const x = r / (2 * diskScaleLength);
  const vDisk = Math.sqrt((G * diskMass) / r) * 
    Math.sqrt(x * x * (1 - Math.exp(-x) * (1 + x)));

  // Black hole contribution (Keplerian)
  const vBH = Math.sqrt((G * bhMass) / r);

  // Dark matter halo contribution (NFW profile)
  const rs = 20 * KPC_TO_PARSEC * PARSEC; // Scale radius
  const rho0 = dmMass / (4 * Math.PI * Math.pow(rs, 3)); // Characteristic density
  const vHalo = Math.sqrt((4 * Math.PI * G * rho0 * Math.pow(rs, 3) / r) * 
    (Math.log(1 + r/rs) - (r/rs)/(1 + r/rs)));

  // Total velocities
  const expectedV = Math.sqrt(vBH * vBH + vBulge * vBulge + vDisk * vDisk); // Without dark matter
  const actualV = Math.sqrt(expectedV * expectedV + vHalo * vHalo); // With dark matter

  return {
    expected: expectedV / 1000, // Convert to km/s
    actual: actualV / 1000,     // Convert to km/s
  };
}

export default function VelocityGraph({ darkMatterMass, normalMatterMass, blackHoleMass }: {
  darkMatterMass: number;
  normalMatterMass: number;
  blackHoleMass: number;
}) {
  const data = useMemo(() => {
    const points = [];
    for (let r = 0; r <= 70; r += 0.5) {
      const velocities = calculateVelocities(r, { 
        darkMatterMass, 
        normalMatterMass, 
        blackHoleMass 
      });
      points.push({
        distance: r,
        expected: velocities.expected,
        actual: velocities.actual,
      });
    }
    return points;
  }, [darkMatterMass, normalMatterMass, blackHoleMass]);

  return (
    <div className="w-full h-[400px] bg-black/50 p-4 rounded-lg">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid stroke="#ffffff20" />
          <XAxis
            dataKey="distance"
            stroke="#ffffff80"
            label={{ value: 'Distance (kpc)', position: 'bottom', fill: '#ffffff80' }}
            domain={[0, 70]}
            ticks={[0, 10, 20, 30, 40, 50, 60, 70]}
          />
          <YAxis
            stroke="#ffffff80"
            label={{ value: 'Velocity (km/s)', angle: -90, position: 'left', fill: '#ffffff80' }}
            domain={[0, 300]}
            ticks={[0, 50, 100, 150, 200, 250, 300]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#ffffff' }}
            formatter={(value: number) => `${value.toFixed(0)} km/s`}
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