import { useState } from 'react';
import css from '../WaterForm/WaterForm.module.css';
import { useForm } from 'react-hook-form';
import Icon from '../../../shared/components/Icon/Icon';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  isNumber,
  timeInputController,
  parseTimeToUnix,
  getFormattedTime,
  unixParser,
} from '../../../helpers/validationsHelper';
import * as yup from 'yup';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { addWater, editWater } from '../../../redux/water/operations';
import { selectActiveDay } from '../../../redux/water/selectors';
import { useTranslation } from 'react-i18next';
import '../../../translate/index.js';
import toastMaker from '../../helpers/toastMaker/toastMaker.jsx';

const schema = yup.object().shape({
  Time: yup
    .string()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Must be in hh:mm format')
    .required('Time is required'),

  Count: yup
    .number()
    .min(50, 'Value must be at least 50')
    .max(1500, 'Value must be at most 1500')
    .required('Count is required'),
});

export default function WaterForm({
  isOpen,
  operationAdd,
  waterId,
  waterAmount,
  waterTime,
  addForActiveDay,
}) {
  const [count, setCount] = useState(operationAdd ? 50 : waterAmount);
  const [time, setTime] = useState(
    operationAdd ? getFormattedTime() : unixParser(waterTime),
  );
  const [err, setErr] = useState(false);
  const [timeErr, setTimeErr] = useState(false);
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const day = useSelector(selectActiveDay);
  const date = new Date(day);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      Count: count,
      Time: time,
    },
    resolver: yupResolver(schema),
  });

  const incrementCount = () => {
    const newCount = Number(count + 50);
    setCount(newCount);
    setValue('Count', newCount);
  };

  const decrementCount = () => {
    const newCount = Number(count - 50);
    setCount(newCount);
    setValue('Count', newCount);
  };

  const onCountChange = event => {
    const value = Number(event.target.value);
    setCount(value);
  };
  const onSubmit = async data => {
    let unixTime;
    if (addForActiveDay) {
      unixTime = parseTimeToUnix(data.Time, date);
    } else {
      unixTime = parseTimeToUnix(data.Time, false);
    }

    const obj = {
      amount: data.Count,
      date: unixTime,
    };

    if (obj.date > new Date()) {
      toastMaker("You can't drink water in the future", 'error');
      isOpen(false);
      return;
    }

    if (obj.date < 1672524000) {
      toastMaker('You cannot select a date before 01.01.2023', 'error');
      isOpen(false);
      return;
    }

    if (operationAdd) {
      await dispatch(addWater(obj));
      isOpen(false);
    } else {
      await dispatch(editWater({ id: waterId, newNote: obj }));
      isOpen(false);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <p className={clsx(css.text, { [css.textUk]: i18n.language === 'uk' })}>
        {t('Correct entered')}:
      </p>
      <p
        className={clsx(css.secondaryText, {
          [css.secondaryTextUk]: i18n.language === 'uk',
        })}
      >
        {t('Amount of water')}:
      </p>
      <div className={css.counterContainer}>
        <button
          className={clsx(css.counterBtn, count <= 50 && css.decrementBtn)}
          type="button"
          onClick={decrementCount}
          disabled={count <= 50}
        >
          <Icon
            className={css.iconMinus}
            width="19"
            height="19"
            id="icon-minus"
          />
        </button>
        <p
          className={clsx(css.count, { [css.countUk]: i18n.language === 'uk' })}
        >
          {count} {t('Water add')}
        </p>
        <button
          className={clsx(css.counterBtn, count >= 1500 && css.incrementBtn)}
          type="button"
          onClick={incrementCount}
          disabled={count >= 1500}
        >
          <Icon
            className={css.iconPlus}
            width="26"
            height="26"
            id="icon-plus"
          />
        </button>
      </div>
      <label
        className={clsx(css.baseLabel, {
          [css.baseLabelUk]: i18n.language === 'uk',
        })}
      >
        {t('Recording time')}:
        <input
          className={clsx(css.baseInput, errors.Time && css.errorInput)}
          {...register('Time', { required: true })}
          onChange={event => timeInputController(event, setTimeErr)}
          maxLength="5"
        />
        <span className={css.error}>
          {errors.Time && errors.Time.message}{' '}
          {timeErr && `Type in format 'hh:mm' please`}
        </span>
      </label>
      <label
        className={clsx(css.secondaryLabel, {
          [css.secondaryLabelUk]: i18n.language === 'uk',
        })}
      >
        {t('Enter the value')}:
        <input
          className={clsx(css.baseInput, errors.Count && css.errorInput)}
          {...register('Count')}
          onChange={onCountChange}
          onKeyDown={event => isNumber(event, setErr)}
          maxLength="4"
        />
        <span className={css.error}>
          {errors.Count && errors.Count.message} {err && 'Type numbers please'}
        </span>
      </label>
      <button
        className={clsx(css.saveBtn, {
          [css.saveBtnUk]: i18n.language === 'uk',
        })}
        type="submit"
      >
        {t('Save setting')}
      </button>
    </form>
  );
}
