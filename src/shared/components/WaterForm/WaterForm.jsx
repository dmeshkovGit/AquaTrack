import { useState, useEffect } from 'react';
import css from '../WaterForm/WaterForm.module.css';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';

export default function WaterForm() {
  const [count, setCount] = useState(50);
  const [time, setTime] = useState(getFormattedTime());

  function getFormattedTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const { register, handleSubmit, setValue, watch, reset } = useForm({
    defaultValues: {
      Count: count,
      Time: time,
    },
  });

  const watchedCount = watch('Count');

  useEffect(() => {
    setValue('Count', count);
  }, [count, setValue]);

  useEffect(() => {
    if (watchedCount !== count) {
      setCount(Number(watchedCount));
    }
  }, [watchedCount]);

  const incrementCount = () => {
    setCount(prevCount => prevCount + 50);
  };

  const decrementCount = () => {
    setCount(prevCount => prevCount - 50);
  };

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit(data => {
        console.log(data);
        reset();
      })}
    >
      <p className={css.text}>Correct entered data:</p>
      <p className={css.secondaryText}>Amount of water:</p>
      <div className={css.counterContainer}>
        <button
          className={clsx(css.counterBtn, count < 50 && css.decrementBtn)}
          type="button"
          onClick={decrementCount}
        >
          -
        </button>
        <p className={css.count}>{count} ml</p>
        <button
          className={clsx(css.counterBtn, count > 1500 && css.incrementBtn)}
          type="button"
          onClick={incrementCount}
        >
          +
        </button>
      </div>
      <label className={css.baseLabel}>
        Recording time:
        <input
          className={css.baseInput}
          {...register('Time', { required: true })}
        />
      </label>
      <label className={css.secondaryLabel}>
        Enter the value of the water used:
        <input className={css.baseInput} {...register('Count')} />
      </label>
      <button className={css.saveBtn} type="submit">
        Save
      </button>
    </form>
  );
}
