import { useState } from 'react';
import CalendarPagination from '../../components/CalendarPagination/CalendarPagination';
import Calendar from '../../components/Calendar/Calendar';
import TestChart from '../../components/waterConsumption/origin/WaterConsumption';
import css from '../MonthInfo/MonthInfo.module.css';

export default function MonthInfo() {
  const [showChart, setShowChart] = useState(false);

  const toggleView = () => {
    console.log('Icon clicked');
    setShowChart(prevShowChart => !prevShowChart);
  };

  return (
    <div className={css.monthInfoContainer}>
      <div className={css.monthInfoPaginationContainer}>
        <h2 className={css.title}>{showChart ? 'Static' : 'Month'}</h2>
        <CalendarPagination isOpen={toggleView} />
        {showChart ? <TestChart /> : <Calendar />}
      </div>
    </div>
  );
}
