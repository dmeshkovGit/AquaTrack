import css from '../Calendar/Calendar.module.css';
import CalendarItem from '../../components/CalendarItem/CalendarItem';
import { useEffect } from 'react';
import { getDayWater } from '../../redux/water/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectActiveDay } from '../../redux/water/selectors';
import { setActiveDay } from '../../redux/water/slice';

export default function Calendar({ daysList }) {
  const activeDay = useSelector(selectActiveDay);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!activeDay) {
      const now = new Date();
      const currentDate = now.toISOString().split('T')[0] + 'T00:00:00.000Z';
      dispatch(setActiveDay(currentDate));
    }
  }, [dispatch]);

  useEffect(() => {
    if (activeDay) {
      dispatch(getDayWater(new Date(activeDay).getTime()));
    }
  }, [activeDay, dispatch]);

  const handleClickDay = day => {
    dispatch(setActiveDay(day));
  };
  return (
    daysList?.length && (
      <ul className={css.calendar}>
        {daysList.map((i, index) => (
          <li key={i.dateParam} onClick={() => handleClickDay(i.dateParam)}>
            <CalendarItem item={i} index={index} activeDay={activeDay} />
          </li>
        ))}
      </ul>
    )
  );
}
