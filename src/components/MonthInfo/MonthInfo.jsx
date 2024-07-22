import CalendarPagination from '../../components/CalendarPagination/CalendarPagination';
import Calendar from '../../components/Calendar/Calendar';
import css from './MonthInfo.module.css';
import { useEffect, useState } from 'react';

import '../../translate/index.js';
import clsx from 'clsx';
import { getMonthInfo } from '../../API/apiOperations.js';
import { useSelector } from 'react-redux';
import { selectDayWater } from '../../redux/water/selectors.js';
import { useTranslation } from 'react-i18next';

export default function MonthInfo() {
  const [date, setDate] = useState(new Date());
  const [showChart, setShowChart] = useState(false);
  const { t, i18n } = useTranslation();
  const [daysList, setDays] = useState([]);
  const dayWater = useSelector(selectDayWater);

  const toggleView = () => {
    console.log('Icon clicked');
    setShowChart(prevShowChart => !prevShowChart);
  };

  // useEffect(() => {
  //   setDate(new Date());
  //   getMonthInfo();
  // }, []);

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
        <h2
          className={clsx(css.title, { [css.titleUk]: i18n.language === 'uk' })}
        >
          {showChart ? 'Static' : t('Month water')}
        </h2>
        <CalendarPagination
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          monthNames={monthNames}
          date={date}
          isOpen={toggleView}
        />
        {showChart ? <TestChart /> : <Calendar />}
      </div>
      <Calendar daysList={daysList} />
    </div>
  );
}
