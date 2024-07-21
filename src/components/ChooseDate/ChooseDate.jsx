import css from '../ChooseDate/ChooseDate.module.css';
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import { useSelector } from 'react-redux';
import { selectActiveDay } from '../../redux/water/selectors.js';

export default function ChooseDate() {
  const [currentDate, setCurrentDate] = useState('');
  const { t } = useTranslation();
  const selectedDay = useSelector(selectActiveDay);

  useEffect(() => {
    if (new Date(selectedDay).toDateString() === new Date().toDateString()) {
      setCurrentDate(t('Today water'));
    } else {
      const date = new Date(selectedDay).toDateString();
      setCurrentDate(date);
    }
  }, [selectedDay, t]);

  return (
    <div>
      <h2 className={css.currentDate}>{currentDate}</h2>
    </div>
  );
}
