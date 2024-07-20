import Icon from '../../shared/components/Icon/Icon';
import css from '../CalendarPagination/CalendarPagination.module.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function CalendarPagination({
  handlePrevMonth,
  monthNames,
  handleNextMonth,
  date,
}) {
  return (
    <div className={css.paginationContainer}>
      <div className={css.buttonsContainer}>
        <button className={css.button} onClick={handlePrevMonth}>
          <FaAngleLeft />
        </button>
        <p className={css.title}>
          {monthNames[date.getMonth()]}, {date.getFullYear()}
        </p>
        <button className={css.button} onClick={handleNextMonth}>
          <FaAngleRight />
        </button>
      </div>
      <Icon className={css.icon} id="pieChart" height={20} width={20} />
    </div>
  );
}
