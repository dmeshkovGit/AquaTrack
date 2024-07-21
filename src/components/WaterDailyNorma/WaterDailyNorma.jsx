import { useSelector } from 'react-redux';
import css from '../WaterDailyNorma/WaterDailyNorma.module.css';
import { selectUserWaterNorm } from '../../redux/user/selectors';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import clsx from 'clsx';

export default function WaterDailyNorma() {
  const { t, i18n } = useTranslation();
  const countWater = useSelector(selectUserWaterNorm);

  return (
    <div className={css.container}>
      <p
        className={clsx(css.waterCount, {
          [css.waterCountUk]: i18n.language === 'uk',
        })}
      >
        {countWater} {t('Count water')}
      </p>
      <p className={clsx(css.text, { [css.textUk]: i18n.language === 'uk' })}>
        {t('Daily norma')}
      </p>
    </div>
  );
}
