import CalendarPagination from '../../components/CalendarPagination/CalendarPagination';
import Calendar from '../../components/Calendar/Calendar';
import css from './MonthInfo.module.css';
import { useEffect, useState } from 'react';

import '../../translate/index.js';
import { getMonthInfo } from '../../API/apiOperations.js';
import { useSelector } from 'react-redux';
import { selectDayWater } from '../../redux/water/selectors.js';

export default function MonthInfo() {
  const [date, setDate] = useState(new Date());
  const [showChart, setShowChart] = useState(false);
  const [daysList, setDays] = useState([]);
  const dayWater = useSelector(selectDayWater);

  const toggleView = () => {
    console.log('Icon clicked');
    setShowChart(prevShowChart => !prevShowChart);
  };

  useEffect(() => {
    setDate(new Date());
    getMonthInfo();
  }, []);

  useEffect(() => {
    const getMonth = async () => {
      try {
        const response = await getMonthInfo(new Date(date).getTime());
        if (response) setDays(response);
      } catch (error) {
        console.log(error);
      }
    };
    getMonth();
  }, [date, dayWater]);

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
    <div className={css.monthInfoContainer}>
      <div className={css.monthInfoPaginationContainer}>
        <h2 className={css.title}>Month</h2>
        <CalendarPagination
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          monthNames={monthNames}
          date={date}
          isOpen={toggleView}
        />
      </div>
      <Calendar daysList={daysList} />
    </div>
  );
}
