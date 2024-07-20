import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const testData = [
  { name: '16', uv: 2 },
  { name: '17', uv: 2.2 },
  { name: '18', uv: 1.8 },
  { name: '19', uv: 1.75 },
  { name: '20', uv: 2.5 },
  { name: '21', uv: 1.9 },
  { name: '22', uv: 2 },
];

export default function TestChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={testData}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="46%" stopColor="#9BE1A0" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 2.5]} />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#9BE1A0"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#9BE1A0"
          activeDot={{ r: 8 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
