'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Sample data for the rotation curve
const data = [
  { distance: 0, expected: 0, actual: 0 },
  { distance: 2, expected: 150, actual: 180 },
  { distance: 4, expected: 200, actual: 250 },
  { distance: 6, expected: 180, actual: 280 },
  { distance: 8, expected: 150, actual: 300 },
  { distance: 10, expected: 120, actual: 320 },
  { distance: 12, expected: 100, actual: 330 },
  { distance: 14, expected: 80, actual: 340 },
  { distance: 16, expected: 60, actual: 350 },
  { distance: 18, expected: 40, actual: 360 },
  { distance: 20, expected: 20, actual: 370 },
];

export default function VelocityGraph() {
  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis
            dataKey="distance"
            stroke="#ffffff80"
            label={{ value: 'Distance (kpc)', position: 'bottom', fill: '#ffffff80' }}
          />
          <YAxis
            stroke="#ffffff80"
            label={{ value: 'Velocity (km/s)', angle: -90, position: 'left', fill: '#ffffff80' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '0.5rem',
            }}
            labelStyle={{ color: '#ffffff' }}
          />
          <Legend
            wrapperStyle={{
              color: '#ffffff',
              paddingTop: '1rem',
            }}
          />
          <Line
            type="monotone"
            dataKey="expected"
            stroke="#4ade80"
            strokeWidth={2}
            dot={false}
            name="Expected (without dark matter)"
          />
          <Line
            type="monotone"
            dataKey="actual"
            stroke="#a855f7"
            strokeWidth={2}
            dot={false}
            name="Actual (with dark matter)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 