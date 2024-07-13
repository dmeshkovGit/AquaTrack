import css from '../WaterProgressBar/WaterProgressBar.module.css';
import { useEffect, useState } from 'react';

export default function WaterProgressBar() {
  const [percent, setPercent] = useState(39);
  const [isPercentVisible, setIsPercentVisible] = useState(true);

  useEffect(() => {
    if (percent < 10 || (percent > 39 && percent < 57) || percent > 85) {
      setIsPercentVisible(false);
    } else {
      setIsPercentVisible(true);
    }
  }, [percent]);

  return (
    <div className={css.wrapper}>
      <h6 className={css.header}> Today</h6>
      <div className={css.bar}>
        <div className={css.progressLine} style={{ width: `${percent}%` }}>
          {isPercentVisible && (
            <span className={css.activePercent} style={{ left: `100%` }}>
              {`${percent}%`}
            </span>
          )}
        </div>
      </div>
      <div className={css.textContainer}>
        <p className={css.text}>0%</p>
        <p className={css.text}>50%</p>
        <p className={css.text}>100%</p>
      </div>
    </div>
  );
}
