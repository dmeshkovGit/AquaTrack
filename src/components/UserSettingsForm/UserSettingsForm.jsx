import css from '../UserSettingsForm/UserSettingsForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import FormulaDescription from './FormulaDescription';

const schema = yup.object().shape({
  gender: yup.string().required('Option is required'),
  email: yup
    .string()
    .email('Please, enter valid email')
    .required('Email is required'),
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Too short! Minimum 3 symbols')
    .max(30, 'Too long! Maximum 30 symbols'),
  weight: yup
    .string()
    .min(1, 'Too short! Minimum 1 symbols')
    .max(3, 'Too long! Maximum 3 symbols')
    .matches(/^[0-9]/, 'Value is not valid, only numbers!'),
  activeTime: yup
    .string()
    .min(1, 'Too short! Minimum 1 symbols')
    .max(3, 'Too long! Maximum 3 symbols')
    .matches(/^[0-9]/, 'Value is not valid, only numbers!'),
  liters: yup
    .string()
    .min(1, 'Too short! Minimum 1 symbols')
    .max(3, 'Too long! Maximum 3 symbols')
    .matches(/^[0-9]/, 'Value is not valid, only numbers!'),
});

export default function UserSettingsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      gender: '',
      name: '',
      email: '',
      weight: 0,
      activeTime: 0,
      liters: 0,
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = data => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <fieldset className={css.fieldset} {...register('gender')}>
        <legend className={css.legend}>Your gender identity</legend>
        <div className={css.radioWrapper}>
          <label className={css.labelsRadioWrap}>
            <input
              className={css.radioInput}
              {...register('gender')}
              type="radio"
              name="gender"
              value="woman"
            />
            <span className={css.fakeRadio}></span>
            <span className={css.label}>Woman</span>
          </label>
          <label className={css.labelsRadioWrap}>
            <input
              autoComplete="off"
              className={css.radioInput}
              {...register('gender')}
              type="radio"
              name="gender"
              value="man"
            />
            <span className={css.fakeRadio}></span>
            <span className={css.label}>Man</span>
          </label>
        </div>
      </fieldset>
      <div className={css.columnsWrapper}>
        <div className={css.leftPart}>
          <div className={css.labelContainer}>
            <label className={clsx(css.label, css.bold)} {...register('name')}>
              Your name
            </label>
            <input
              autoComplete="off"
              type="text"
              className={clsx(css.input, errors.name && css.errorInput)}
              {...register('name')}
            />
            {errors.name && (
              <p className={css.errorText}>{errors.name?.message}</p>
            )}
          </div>
          <div className={css.labelContainer}>
            <label className={clsx(css.label, css.bold)} {...register('email')}>
              Your email
            </label>
            <input
              autoComplete="off"
              className={clsx(css.input, errors.email && css.errorInput)}
              {...register('email')}
              type="email"
            />
            {errors.email && (
              <p className={css.errorText}>{errors.email.message}</p>
            )}
          </div>
          <FormulaDescription />
        </div>
        <div className={css.rightPart}>
          <div className={css.labelContainer}>
            <label className={css.label} {...register('weight')}>
              Your weight in kilograms:
            </label>
            <input
              autoComplete="off"
              type="number"
              className={clsx(css.input, errors.weight && css.errorInput)}
              {...register('weight')}
            />
            {errors.weight && (
              <p className={css.errorText}>{errors.weight.message}</p>
            )}
          </div>
          <div className={css.labelContainer}>
            <label className={css.label} {...register('activeTime')}>
              The time of active participation in sports:
            </label>
            <input
              autoComplete="off"
              type="number"
              className={clsx(css.input, errors.activeTime && css.errorInput)}
              {...register('activeTime')}
            />
            {errors.activeTime && (
              <p className={css.errorText}>{errors.activeTime.message}</p>
            )}
          </div>
          <p className={css.waterAmount}>
            The required amount of water in liters per day:{' '}
            <span className={css.accent}>1.8l</span>
          </p>
          <div className={css.labelContainer}>
            <label
              className={clsx(css.label, css.bold)}
              {...register('liters')}
            >
              Write down how much water you will drink:
            </label>
            <input
              autoComplete="off"
              type="number"
              className={clsx(css.input, errors.liters && css.errorInput)}
              {...register('liters')}
            />
            {errors.liters && (
              <p className={css.errorText}>{errors.liters.message}</p>
            )}
          </div>
        </div>
      </div>
      <button type="submit" className={css.saveBtn}>
        Save
      </button>
    </form>
  );
}
