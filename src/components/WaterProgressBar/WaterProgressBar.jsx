import css from '../WaterProgressBar/WaterProgressBar.module.css';
import { useState } from 'react';

export default function WaterProgressBar() {
  const [percent, setPercent] = useState('30');
  return (
    <div className={css.wrapper}>
      <h6 className={css.header}> Today</h6>
      <div className={css.bar}>
        <div className={css.progressLine} style={{ width: `${percent}%` }}>
          <span className={css.activePercent} style={{ left: `100%` }}>
            {`${percent}%`}
          </span>
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
