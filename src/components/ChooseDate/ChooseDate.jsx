import css from '../ChooseDate/ChooseDate.module.css';
import { useEffect, useState } from 'react';

export default function ChooseDate() {

  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {

    const today = new Date().toDateString();


    if (today === new Date().toDateString()) {
      setCurrentDate(`Today`);
    }

    else {setCurrentDate(`Another day from calendar`); }

  },[]);


  return <div> <h2 className={css.currentDate}>{currentDate}</h2></div>;
}
