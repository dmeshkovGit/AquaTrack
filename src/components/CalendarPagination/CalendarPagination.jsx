import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import clsx from 'clsx';
import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import css from './CalendarPagination.module.css';

export default function CalendarPagination({
  isOpen,
  handlePrevMonth,
  handleNextMonth,
  monthNames,
  date,
}) {
  const { t, i18n } = useTranslation();

  return (
    <div className={css.paginationContainer}>
      <div className={css.buttonsContainer}>
        <button className={css.button} onClick={handlePrevMonth}>
          <FaAngleLeft />
        </button>
        <p
          className={clsx(css.title, { [css.titleUk]: i18n.language === 'uk' })}
        >
          {monthNames[date.getMonth()]}, {date.getFullYear()}
        </p>
        <button className={css.button} onClick={handleNextMonth}>
          <FaAngleRight />
        </button>
      </div>
      <div className={css.iconContainer}>
        <div
          className={css.icon}
          id="pieChart"
          style={{
            cursor: 'pointer',
            width: 24,
            height: 24,
            backgroundColor: 'red',
            borderRadius: '50%',
          }}
          onClick={() => {
            console.log('Div clicked');
            isOpen();
          }}
        ></div>
      </div>
    </div>
  );
}
