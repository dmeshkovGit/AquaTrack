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

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      Count: count,
      CountDouble: count,
      Time: time,
    },
  });

  const watchedCount = watch('Count');
  const watchedCountDouble = watch('CountDouble');

  useEffect(() => {
    setValue('Count', count);
    setValue('CountDouble', count);
  }, [count, setValue]);

  useEffect(() => {
    if (watchedCount !== count) {
      setCount(Number(watchedCount));
    }
  }, [watchedCount]);

  useEffect(() => {
    if (watchedCountDouble !== count) {
      setCount(Number(watchedCountDouble));
    }
  }, [watchedCountDouble]);

  const incrementCount = () => {
    setCount(prevCount => prevCount + 50);
  };

  const decrementCount = () => {
    setCount(prevCount => Math.max(0, prevCount - 50));
  };

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit(data => {
        console.log({ count: data.Count, time: data.Time });
      })}
    >
      <p className={css.text}>Correct entered data:</p>
      <label className={css.baseLabel}>
        Amount of water:
        <div className={css.counterContainer}>
          <button
            className={clsx(css.counterBtn, css.decrementBtn)}
            type="button"
            onClick={decrementCount}
          >
            -
          </button>
          <input
            className={css.countInput}
            type="number"
            {...register('Count')}
          />
          <button
            className={clsx(css.counterBtn, css.incrementBtn)}
            type="button"
            onClick={incrementCount}
          >
            +
          </button>
        </div>
      </label>
      <label className={css.baseLabel}>
        Recording time:
        <input
          className={css.timeInput}
          {...register('Time', { required: true })}
        />
      </label>

      <label className={css.secondaryLabel}>
        Enter the value of the water used:
        <input type="number" {...register('CountDouble')} />
      </label>

      <input type="submit" />
    </form>
  );
}
