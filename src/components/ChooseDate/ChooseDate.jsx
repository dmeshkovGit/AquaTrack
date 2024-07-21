import css from '../ChooseDate/ChooseDate.module.css';
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import clsx from 'clsx';

export default function ChooseDate() {
  const [currentDate, setCurrentDate] = useState('');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const today = new Date().toDateString();

    if (today === new Date().toDateString()) {
      setCurrentDate(t('Today water'));
    } else {
      setCurrentDate(`Another day from calendar`);
    }
  }, [t]);

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
