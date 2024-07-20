import css from '../Calendar/Calendar.module.css';
import CalendarItem from '../../components/CalendarItem/CalendarItem';
import { useEffect, useState } from 'react';
import { getDayWater } from '../../redux/water/operations';
import { useDispatch } from 'react-redux';

export default function Calendar({ daysList }) {
  const [activeDay, setActiveDay] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0] + 'T00:00:00.000Z';
    setActiveDay(currentDate);
  }, []);

  useEffect(() => {
    dispatch(getDayWater(new Date(activeDay).getTime()));
  }, [activeDay, dispatch]);

  const handleClickDay = day => {
    setActiveDay(day);
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
