'use client';

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

// Sample data for M31 (Andromeda) rotation curve
const data = [
  { radius: 0, observed: 0, newtonian: 0 },
  { radius: 5, observed: 150, newtonian: 120 },
  { radius: 10, observed: 200, newtonian: 85 },
  { radius: 15, observed: 220, newtonian: 70 },
  { radius: 20, observed: 230, newtonian: 60 },
  { radius: 25, observed: 240, newtonian: 54 },
  { radius: 30, observed: 250, newtonian: 49 },
  { radius: 35, observed: 260, newtonian: 45 },
  { radius: 40, observed: 270, newtonian: 42 },
  { radius: 45, observed: 280, newtonian: 40 },
  { radius: 50, observed: 290, newtonian: 38 },
];

export default function RotationCurve() {
  return (
    <div className="w-full h-[400px] p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        M31 (Andromeda) Rotation Curve
      </h2>
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
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="radius"
            label={{ value: 'Radius (kpc)', position: 'bottom' }}
          />
          <YAxis
            label={{
              value: 'Velocity (km/s)',
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="observed"
            stroke="#8884d8"
            name="Observed"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="newtonian"
            stroke="#82ca9d"
            name="Newtonian Prediction"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
} 