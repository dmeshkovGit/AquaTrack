import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import css from './CalendarPagination.module.css';
import Icon from '../../shared/components/Icon/Icon';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import clsx from 'clsx';

export default function CalendarPagination({
  isOpen,
  handleNextMonth,
  handlePrevMonth,
  date,
}) {
  const { t, i18n } = useTranslation();
  const isPrevMonthDisabled =
    new Date(date).getTime() < new Date('2023-02-01T00:00:00.000Z').getTime();
  const monthNames = [
    t('Month january'),
    t('Month february'),
    t('Month march'),
    t('Month april'),
    t('Month may'),
    t('Month june'),
    t('Month july'),
    t('Month august'),
    t('Month september'),
    t('Month october'),
    t('Month november'),
    t('Month december'),
  ];

  return (
    <div className={css.paginationContainer}>
      <div className={css.buttonsContainer}>
        <button
          className={css.button}
          disabled={isPrevMonthDisabled}
          onClick={handlePrevMonth}
        >
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
      <Icon
        onClick={isOpen}
        className={css.icon}
        id="pieChart"
        height={20}
        width={20}
      />
    </div>
  );
}
