import { useSelector } from 'react-redux';
import css from '../WaterDailyNorma/WaterDailyNorma.module.css';
import { selectUserWaterNorm } from '../../redux/user/selectors';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

export default function WaterDailyNorma() {
  const { t } = useTranslation();
  const countWater = useSelector(selectUserWaterNorm);

  return (
    <div className={css.container}>
      <p className={css.waterCount}>
        {countWater} {t('Count water')}
      </p>
      <p className={css.text}>{t('Daily norma')}</p>
    </div>
  );
}
