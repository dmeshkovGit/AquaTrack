import { useSelector } from 'react-redux';
import css from '../WaterProgressBar/WaterProgressBar.module.css';
import { useEffect, useState } from 'react';
import { selectUserWaterNorm } from '../../redux/user/selectors';
import { selectDayWater } from '../../redux/water/selectors';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

export default function WaterProgressBar() {
  const [percent, setPercent] = useState(0);
  const [isPercentVisible, setIsPercentVisible] = useState(true);
  const dayWater = useSelector(selectUserWaterNorm);
  const { t } = useTranslation();

  // Для ТЕСТУ ПОКИ НЕ ЗАПИСУЮТЬСЯ ДАНІ В СЕТІНГС ЮЗЕРА
  // const dayWater = 1 * 1000;

  const dayDrinking = useSelector(selectDayWater);

  useEffect(() => {
    const totalAmount = dayDrinking.reduce(
      (acc, drink) => acc + drink.amount,
      0,
    );
    if (totalAmount > 0) {
      setPercent(Math.round((totalAmount * 100) / (dayWater * 1000)));
    }
  }, [dayDrinking, dayWater]);

  useEffect(() => {
    if (percent < 10 || (percent > 39 && percent < 57) || percent > 85) {
      setIsPercentVisible(false);
    } else {
      setIsPercentVisible(true);
    }
  }, [percent]);

  return (
    <div className={css.wrapper}>
      <h6 className={css.header}>{t('Today water')}</h6>
      <div className={css.bar}>
        <div className={css.progressLine} style={{ maxWidth: `${percent}%` }}>
          {isPercentVisible && (
            <span className={css.activePercent} style={{ left: `100%` }}>
              {`${percent}%`}
            </span>
          )}
        </div>
      </div>
      <div className={css.textContainer}>
        <p className={css.text1}>0%</p>
        <p className={css.text}>50%</p>
        <p className={css.text2}>100%</p>
      </div>
    </div>
  );
}
