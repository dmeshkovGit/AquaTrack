import { useState, useEffect } from 'react';
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
import axios from 'axios';

export default function TestChart() {
  const [weekData, setWeekData] = useState([]);

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - startDate.getDay());

        const dates = Array.from({ length: 7 }, (v, i) => {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i);
          return date.toISOString().split('T')[0]; // Формат YYYY-MM-DD
        });

        const promises = dates.map(
          date => axios.get(`/api/water/day/${date}`), // Використовуйте формат YYYY-MM-DD
        );
        const results = await Promise.all(promises);

        const data = results.map((result, index) => ({
          name: dates[index].split('-').reverse().join('-'),
          uv: result.data.totalDayWater,
        }));

        setWeekData(data);
      } catch (error) {
        console.error('Error fetching weekly data', error);
      }
    };

    fetchWeeklyData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={weekData}>
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
