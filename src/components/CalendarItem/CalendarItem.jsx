import clsx from 'clsx';
import css from '../CalendarItem/CalendarItem.module.css';
import { selectUserWaterNorm } from '../../redux/user/selectors';
import { useSelector } from 'react-redux';
import { getStartDay } from '../../helpers/timeConvertor';

export default function CalendarItem({ item, activeDay, index }) {
  const countWater = useSelector(selectUserWaterNorm);
  const calculateWaterPercentage = totalDayWater => {
    if (!countWater) {
      return 0;
    }
    const countWaterMilliliters = countWater * 1000;
    const percentage = (totalDayWater / countWaterMilliliters) * 100;
    let rounded = percentage.toFixed(1);
    return rounded.endsWith('.0') ? parseInt(rounded, 10) : parseFloat(rounded);
  };

  return (
    <div className={css.container}>
      <button
        className={clsx(
          css.button,
          getStartDay(new Date(item.dateParam)) === activeDay &&
            css.activeButton,
          calculateWaterPercentage(item.totalDayWater) >= 100 &&
            css.fullDayButton,
        )}
      >
        {index + 1}
      </button>
      <span className={css.label}>
        {calculateWaterPercentage(item?.totalDayWater)}%
      </span>
    </div>
  );
}
