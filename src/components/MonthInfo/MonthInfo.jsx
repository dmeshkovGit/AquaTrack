import css from '../MonthInfo/MonthInfo.module.css';
import CalendarPagination from '../../components/CalendarPagination/CalendarPagination';
import Calendar from '../../components/Calendar/Calendar';

export default function MonthInfo() {
  return (
    <div>
      <CalendarPagination />
      <Calendar />
    </div>
  );
}
