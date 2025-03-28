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
  Scatter,
} from 'recharts';

interface MONDRotationCurveProps {
  normalMatterMass: number;  // in solar masses
  blackHoleMass: number;     // in solar masses
  darkMatterMass: number;    // in solar masses
  darkMatterRatio: number;   // ratio of dark matter to total mass
}

export default function MONDRotationCurve({ 
  normalMatterMass, 
  blackHoleMass,
  darkMatterMass,
  darkMatterRatio
}: MONDRotationCurveProps) {
  // Constants
  const G = 6.67430e-11; // m³/kg/s²
  const SOLAR_MASS = 2e30; // kg
  const PARSEC = 3.086e16; // meters
  const KPC_TO_M = PARSEC * 1000;
  const A0 = 1.2e-10; // MOND acceleration constant in m/s²

  // Calculate data points for the graph
  const data = useMemo(() => {
    const points = [];
    
    try {
      // Calculate points from 0.1 kpc to 50 kpc
      for (let r = 0.1; r <= 50; r += 0.5) {
        const rMeters = r * KPC_TO_M;
        
        // Visible mass within radius r (simplified model)
        const diskMass = normalMatterMass * SOLAR_MASS * (1 - Math.exp(-r / 3));
        const centralMass = blackHoleMass * SOLAR_MASS;
        const visibleMassWithinR = diskMass + centralMass;

        // Dark matter mass within radius r (NFW profile approximation)
        const rs = 20 * KPC_TO_M; // Scale radius
        const darkMassWithinR = darkMatterMass * SOLAR_MASS * 
          (Math.log(1 + rMeters/rs) - (rMeters/rs)/(1 + rMeters/rs));
        
        // Total mass for dark matter model
        const totalMassWithinR = Math.max(visibleMassWithinR + darkMassWithinR, 1e30);
        
        // Newtonian acceleration from visible matter only
        const aN = G * visibleMassWithinR / Math.max(rMeters * rMeters, 1e10);
        
        // MOND interpolating function (simple version)
        const x = Math.max(aN / A0, 1e-10);
        const mu = x / Math.sqrt(1 + x * x);
        
        // MOND acceleration
        const aMOND = aN / mu;
        
        // Calculate velocities with safety checks
        const vNewtonian = Math.sqrt(Math.max(aN * rMeters, 0));
        const vMOND = Math.sqrt(Math.max(aMOND * rMeters, 0));
        const vDarkMatter = Math.sqrt(Math.max(G * totalMassWithinR / rMeters, 0));
        
        // Simulated "observed" velocity with realistic scatter
        const baseVelocity = darkMatterRatio > 0.5 ? vDarkMatter : vMOND;
        const scatter = 1 + (Math.random() - 0.5) * 0.1; // ±5% scatter
        const vObserved = baseVelocity * scatter;

        // Convert to km/s and add to points array
        points.push({
          distance: r,
          mondVelocity: vMOND / 1000,
          newtonianVelocity: vNewtonian / 1000,
          observedVelocity: vObserved / 1000,
          darkMatterVelocity: vDarkMatter / 1000
        });
      }
    } catch (error) {
      console.error('Error calculating rotation curve:', error);
    }

    return points;
  }, [normalMatterMass, blackHoleMass, darkMatterMass, darkMatterRatio]);

  // If no data points were generated, show error
  if (data.length === 0) {
    return (
      <div className="w-full h-[500px] bg-black/30 rounded-lg flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p>Error calculating rotation curve.</p>
          <p>Please check galaxy parameters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] bg-black/30 rounded-lg p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis
            dataKey="distance"
            type="number"
            domain={[0, 50]}
            tick={{ fill: '#fff' }}
            label={{ value: 'Distance from Galactic Center (kpc)', fill: '#fff', dy: 20 }}
          />
          <YAxis
            domain={[0, 300]}
            tick={{ fill: '#fff' }}
            label={{ 
              value: 'Rotation Velocity (km/s)', 
              angle: -90, 
              fill: '#fff',
              dx: -40 
            }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#000', border: '1px solid #333' }}
            labelStyle={{ color: '#fff' }}
            formatter={(value: number) => [`${value.toFixed(1)} km/s`, 'Velocity']}
            labelFormatter={(value) => `Distance: ${Number(value).toFixed(1)} kpc`}
          />
          <Legend />
          <Line
            name="MOND Prediction"
            type="monotone"
            dataKey="mondVelocity"
            stroke="#8884d8"
            dot={false}
          />
          <Line
            name="Newtonian (No Dark Matter)"
            type="monotone"
            dataKey="newtonianVelocity"
            stroke="#82ca9d"
            dot={false}
          />
          <Line
            name="Dark Matter Model"
            type="monotone"
            dataKey="darkMatterVelocity"
            stroke="#ff8c00"
            dot={false}
          />
          <Scatter
            name="Simulated Observations"
            dataKey="observedVelocity"
            fill="#ff4444"
            shape="circle"
            legendType="circle"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 