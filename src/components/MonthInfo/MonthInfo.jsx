import css from '../MonthInfo/MonthInfo.module.css';
import CalendarPagination from '../../components/CalendarPagination/CalendarPagination';
import Calendar from '../../components/Calendar/Calendar';

export default function MonthInfo() {
  return (
    <div className={css.monthInfoContainer}>
      <div className={css.monthInfoPaginationContainer}>
        <h2 className={css.title}>Month</h2>
        <CalendarPagination />
      </div>
      <Calendar />
    </div>
  );
}
