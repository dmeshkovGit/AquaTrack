import css from '../ChooseDate/ChooseDate.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveDay } from '../../redux/water/selectors.js';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import clsx from 'clsx';

export default function ChooseDate() {
  const [currentDate, setCurrentDate] = useState('');
  const { t, i18n } = useTranslation();
  const selectedDay = useSelector(selectActiveDay);

  useEffect(() => {
    if (new Date(selectedDay).toDateString() === new Date().toDateString()) {
      setCurrentDate(t('Today water'));
    } else {
      const date = new Date(selectedDay);
      const monthKey = `Month ${date
        .toLocaleString('en-US', { month: 'long' })
        .toLowerCase()}`;
      const translatedMonth = t(monthKey);
      const formattedDate = `${date.getDate()}, ${translatedMonth}`;
      setCurrentDate(formattedDate);
    }
  }, [selectedDay, t]);

  return (
    <div>
      {' '}
      <h2
        className={clsx(css.currentDate, {
          [css.currentDateUk]: i18n.language === 'uk',
        })}
      >
        {currentDate}
      </h2>
    </div>
  );
}
