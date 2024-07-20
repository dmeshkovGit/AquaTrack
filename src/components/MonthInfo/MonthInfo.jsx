import css from '../MonthInfo/MonthInfo.module.css';
import CalendarPagination from '../../components/CalendarPagination/CalendarPagination';
import Calendar from '../../components/Calendar/Calendar';
import { useEffect, useState } from 'react';

import '../../translate/index.js';
import { getMonthInfo } from '../../API/apiOperations.js';

export default function MonthInfo() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDate(new Date());
    getMonthInfo();
  }, []);
  useEffect(() => {
    console.log(date);
  }, [date]);
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

  const handleChangeDay = day => {
    setDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(day);
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
        />
      </div>
      <Calendar handleChangeDay={handleChangeDay} />
    </div>
  );
}
