import { useState } from 'react';
import CalendarPagination from '../../components/CalendarPagination/CalendarPagination';
import Calendar from '../../components/Calendar/Calendar';
import WaterConsumption from '../../components/waterConsumption/origin/WaterConsumption.jsx';
import css from './MonthInfo.module.css';
import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

export default function MonthInfo() {
  const [showChart, setShowChart] = useState(false);
  const { t } = useTranslation();

  const toggleView = () => {
    setShowChart(prevShowChart => !prevShowChart);
  };

  return (
    <div className={css.monthInfoContainer}>
      <div className={css.monthInfoPaginationContainer}>
        <h2 className={css.title}>
          {showChart ? 'Statistics' : t('Month water')}
        </h2>
        <CalendarPagination isOpen={toggleView} />
      </div>
      {showChart ? <WaterConsumption /> : <Calendar />}
    </div>
  );
}
