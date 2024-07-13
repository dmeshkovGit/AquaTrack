import css from '../Calendar/Calendar.module.css';
import CalendarItem from '../../components/CalendarItem/CalendarItem';
import { useEffect, useState } from 'react';

export default function Calendar() {
  const [daysList, setDays] = useState([]);
  const [activeDay, setActiveDay] = useState('');
  useEffect(() => {
    let currentDate = new Date();
    setActiveDay(currentDate.getDate());
    const list = [];
    for (
      let i = 1;
      i <=
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0,
      ).getDate();
      i++
    ) {
      list.push(i);
    }
    setDays([...list]);
  }, []);

  return (
    daysList.length && (
      <ul className={css.calendar}>
        {daysList.map(i => (
          <li key={i}>
            <CalendarItem item={i} activeDay={activeDay} />
          </li>
        ))}
      </ul>
    )
  );
}
