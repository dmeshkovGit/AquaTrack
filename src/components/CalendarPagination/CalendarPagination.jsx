import { useState } from 'react';
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
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import css from './CalendarPagination.module.css';
import Icon from '../../shared/components/Icon/Icon';

export default function CalendarPagination() {
  const [date, setDate] = useState(new Date());
  const [showWeeklyChart, setShowWeeklyChart] = useState(false);

  const handlePrevMonth = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleIconClick = () => {
    setShowWeeklyChart(prev => !prev);
  };

  const DayChart = [
    { day: 'Monday', water: 2 },
    { day: 'Tuesday', water: 2.5 },
    { day: 'Wednesday', water: 3 },
    { day: 'Thursday', water: 2.8 },
    { day: 'Friday', water: 3.2 },
    { day: 'Saturday', water: 2.9 },
    { day: 'Sunday', water: 3.1 },
  ];

  const weekChartData = DayChart.map(day => ({
    day: day.day,
    water: day.water * 7, // Assuming this is weekly consumption based on daily values
  }));

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className={css.paginationContainer}>
      <div className={css.buttonsContainer}>
        <button className={css.button} onClick={handlePrevMonth}>
          <FaAngleLeft />
        </button>
        <p className={css.title}>
          {monthNames[date.getMonth()]}, {date.getFullYear()}
        </p>
        <button className={css.button} onClick={handleNextMonth}>
          <FaAngleRight />
        </button>
      </div>
      <div className={css.iconContainer}>
        <Icon
          className={css.icon}
          id="pieChart"
          height={20}
          width={20}
          onClick={handleIconClick}
          style={{ cursor: 'pointer' }}
        />
      </div>
      {showWeeklyChart && (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={weekChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="water"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
