import { useState, useEffect } from 'react';
import Icon from '../../shared/components/Icon/Icon';
import css from '../CalendarPagination/CalendarPagination.module.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function CalendarPagination() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setDate(new Date());
  }, []);

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
      <Icon className={css.icon} id="pieChart" height={20} width={20} />
    </div>
  );
}
