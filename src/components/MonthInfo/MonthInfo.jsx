import { useState } from 'react';
import CalendarPagination from '../../components/CalendarPagination/CalendarPagination';
import Calendar from '../../components/Calendar/Calendar';
import TestChart from '../../components/waterConsumption/origin/WaterConsumption';
import css from '../MonthInfo/MonthInfo.module.css';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import clsx from 'clsx';

export default function MonthInfo() {
  const [showChart, setShowChart] = useState(false);
  const { t, i18n } = useTranslation();
  const toggleView = () => {
    console.log('Icon clicked');
    setShowChart(prevShowChart => !prevShowChart);
  };

  return (
    <div className={css.monthInfoContainer}>
      <div className={css.monthInfoPaginationContainer}>
        <h2
          className={clsx(css.title, { [css.titleUk]: i18n.language === 'uk' })}
        >
          {showChart ? 'Static' : t('Month water')}
        </h2>
        <CalendarPagination isOpen={toggleView} />
        {showChart ? <TestChart /> : <Calendar />}
      </div>
    </div>
  );
}
