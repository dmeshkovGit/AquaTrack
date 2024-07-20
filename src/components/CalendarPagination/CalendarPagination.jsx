import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import css from './CalendarPagination.module.css';
import Icon from '../../shared/components/Icon/Icon';

export default function CalendarPagination({
  handlePrevMonth,
  monthNames,
  handleNextMonth,
  date,
  isOpen,
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
      <div className={css.iconContainer}>
        <Icon
          className={css.icon}
          id="pieChart"
          onClick={() => {
            console.log('Div clicked');
            isOpen();
          }}
        />
      </div>
    </div>
  );
}
