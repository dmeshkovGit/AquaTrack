import { useState, useEffect } from 'react';
import CalendarPagination from '../../components/CalendarPagination/CalendarPagination';
import Calendar from '../../components/Calendar/Calendar';
import WaterConsumption from '../../components/waterConsumption/origin/WaterConsumption.jsx';
import css from './MonthInfo.module.css';
import clsx from 'clsx';
import { getMonthInfo } from '../../API/apiOperations.js';
import { useSelector } from 'react-redux';
import { selectDayWater } from '../../redux/water/selectors.js';
import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

export default function MonthInfo() {
  const [showChart, setShowChart] = useState(false);
  const { t, i18n } = useTranslation();
  const [daysList, setDays] = useState([]);
  const dayWater = useSelector(selectDayWater);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
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

  const toggleView = () => {
    setShowChart(prevShowChart => !prevShowChart);
  };

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
          {showChart ? 'Statistics' : t('Month water')}
        </h2>
        <CalendarPagination
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          monthNames={monthNames}
          date={date}
          isOpen={toggleView}
        />
      </div>
      {showChart ? <WaterConsumption /> : <Calendar />}
    </div>
  );
}
