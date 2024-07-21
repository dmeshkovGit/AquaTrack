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
        <CartesianGrid stroke="none" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} />
        <YAxis
          domain={[0, 2.5]}
          tickFormatter={tick => (tick === 0 ? '0%' : `${tick} L`)}
          ticks={[0, 0.5, 1, 1.5, 2, 2.5]}
          axisLine={false}
          tickLine={false}
        />
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
          dot={<CustomDot />}
          activeDot={{ r: 18 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
const CustomDot = props => {
  const { cx, cy, fill } = props;
  return <circle cx={cx} cy={cy} r={18} stroke="none" fill={fill} />;
};
