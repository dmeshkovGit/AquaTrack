import css from '../Calendar/Calendar.module.css';
import CalendarItem from '../../components/CalendarItem/CalendarItem';
import { useEffect } from 'react';
import { getDayWater } from '../../redux/water/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveDay } from '../../redux/water/selectors';
import { setActiveDay } from '../../redux/water/slice';
import { getStartDay } from '../../helpers/timeConvertor';

export default function Calendar({ daysList }) {
  const activeDay = useSelector(selectActiveDay);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!activeDay) {
      const currentDate = getStartDay(new Date());
      dispatch(setActiveDay(currentDate));
    }

    if (activeDay) {
      dispatch(getDayWater(new Date(activeDay).getTime()));
      console.log(new Date(activeDay).getTime());
    }
  }, [dispatch, activeDay]);

  const handleClickDay = day => {
    dispatch(setActiveDay(day));
  };
  return (
    daysList?.length && (
      <ul className={css.calendar}>
        {daysList.map((i, index) => (
          <li
            key={i.dateParam}
            onClick={() => {
              handleClickDay(getStartDay(new Date(i.dateParam)));
            }}
          >
            <CalendarItem item={i} index={index} activeDay={activeDay} />
          </li>
        ))}
      </ul>
    )
  );
}
