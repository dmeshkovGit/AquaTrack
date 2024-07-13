import css from '../CalendarPagination/CalendarPagination.module.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

export default function CalendarPagination() {
  return (
    <div className={css.paginationContainer}>
      <div className={css.buttonsContainer}>
        <button className={css.button}>
          <FaAngleLeft />
        </button>
        <p className={css.title}>April, 2024</p>
        <button className={css.button}>
          <FaAngleRight />
        </button>
      </div>
      <span>I</span>
    </div>
  );
}
