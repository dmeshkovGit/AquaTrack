import css from '../ChooseDate/ChooseDate.module.css';
import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

export default function ChooseDate() {
  const [currentDate, setCurrentDate] = useState('');
  const { t } = useTranslation();

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
      <h2 className={css.currentDate}>{currentDate}</h2>
    </div>
  );
}
