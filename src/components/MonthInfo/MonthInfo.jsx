import css from '../MonthInfo/MonthInfo.module.css';
import CalendarPagination from '../../components/CalendarPagination/CalendarPagination';
import Calendar from '../../components/Calendar/Calendar';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

export default function MonthInfo() {
  const { t } = useTranslation();
  return (
    <div className={css.monthInfoContainer}>
      <div className={css.monthInfoPaginationContainer}>
        <h2 className={css.title}>{t('Month water')}</h2>
        <CalendarPagination />
      </div>
      <Calendar />
    </div>
  );
}
