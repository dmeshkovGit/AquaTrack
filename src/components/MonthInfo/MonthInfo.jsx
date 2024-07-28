import CalendarPagination from '../../components/CalendarPagination/CalendarPagination';
import Calendar from '../../components/Calendar/Calendar';
import css from './MonthInfo.module.css';
import { useEffect, useState } from 'react';
import '../../translate/index.js';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDayWater,
  selectMonthWater,
} from '../../redux/water/selectors.js';
import { useTranslation } from 'react-i18next';
import WaterStatistic from '../WaterStatistic/WaterStatistic.jsx';
import { getMonthInfo } from '../../redux/water/operations.js';

export default function MonthInfo() {
  const [date, setDate] = useState(new Date());
  const [showStat, setShowStat] = useState(false);
  const { t, i18n } = useTranslation();
  const daysList = useSelector(selectMonthWater);
  const dayWater = useSelector(selectDayWater);
  const dispatch = useDispatch();

  const toggleView = () => {
    setShowStat(showStat => !showStat);
  };

  useEffect(() => {
    dispatch(getMonthInfo(new Date(date).getTime()));
  }, [dispatch, date, dayWater]);

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
          {showStat ? 'Static' : t('Month water')}
        </h2>
        <CalendarPagination
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
          monthNames={monthNames}
          date={date}
          isOpen={showStat}
          setIsOpen={toggleView}
        />
      </div>
      {showStat ? <WaterStatistic /> : <Calendar daysList={daysList} />}
    </div>
  );
}
