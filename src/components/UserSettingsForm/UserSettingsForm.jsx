import css from '../UserSettingsForm/UserSettingsForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import FormulaDescription from './FormulaDescription';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading, selectUser } from '../../redux/user/selectors';
import { updateUser } from '../../redux/user/operations';
import toast from 'react-hot-toast';
import { Loader } from '../../shared/components/Loader/Loader';
import { isNumberAndDot, maxNumber } from '../../helpers/validationsHelper';

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
  weight: yup.number().max(150, 'Maximum 150 kg'),
  activeTime: yup.number().max(24, 'Maximum 24 hours'),
  liters: yup.number().max(10, 'Maximum 10 liters'),
});

export default function UserSettingsForm({ isModalOpen }) {
  const [gender, setGender] = useState('');
  const [activity, setActivity] = useState(0);
  const [weight, setWeight] = useState(0);
  const [waterVolume, setWaterVolume] = useState(0);
  const [liters, setLiters] = useState(0);

  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      gender: `${user.gender || gender}`,
      name: `${user.name || ''}`,
      email: `${user.email || ''}`,
      weight: `${user.weight || weight}`,
      activeTime: `${user.activeTime || activity}`,
      liters: `${user.liters || liters}`,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setGender(user.gender);
    setActivity(user.activeTime);
    setWeight(user.weight);
    setLiters(user.liters);
  }, [user]);

  useEffect(() => {
    const countWaterVolume = (gender, activity = 0, weight = 0) => {
      let volume = 0;
      if (gender === 'man') {
        volume = Number(weight) * 0.03 + Number(activity) * 0.4;
      }
      if (gender === 'woman') {
        volume = Number(weight) * 0.04 + Number(activity) * 0.6;
      }

      setWaterVolume(volume);
      setValue('liters', liters || volume.toFixed(1));
    };

    countWaterVolume(gender, activity, weight);
  }, [gender, activity, weight, user]);

  const onSubmit = data => {
    dispatch(updateUser({ _id: user._id, ...data }))
      .unwrap()
      .then(() => {
        isModalOpen(false);
        toast.success('Data was successfully updated');
      })
      .catch(() => toast.error('Sorry, try again later'));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <fieldset
          className={css.fieldset}
          {...register('gender')}
          onChange={e => {
            setGender(e.target.value);
          }}
        >
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
              <label
                className={clsx(css.label, css.bold)}
                {...register('name')}
              >
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
              <label
                className={clsx(css.label, css.bold)}
                {...register('email')}
              >
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
                type="text"
                className={clsx(css.input, errors.weight && css.errorInput)}
                {...register('weight')}
                onBlur={e => {
                  setWeight(e.target.value);
                }}
                onKeyDown={event =>
                  isNumberAndDot(event, setError, clearErrors)
                }
                onChange={e => maxNumber(e, setError, setValue, clearErrors)}
                maxLength="3"
                max="150"
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
                type="text"
                className={clsx(css.input, errors.activeTime && css.errorInput)}
                {...register('activeTime')}
                onBlur={e => setActivity(e.target.value)}
                onKeyDown={event =>
                  isNumberAndDot(event, setError, clearErrors)
                }
                onChange={e => maxNumber(e, setError, setValue, clearErrors)}
                maxLength="3"
                max="24"
              />
              {errors.activeTime && (
                <p className={css.errorText}>{errors.activeTime.message}</p>
              )}
            </div>
            <p className={css.waterAmount}>
              The required amount of water in liters per day:{' '}
              <span className={css.accent}>{waterVolume.toFixed(1)} l</span>
            </p>
            <div className={css.labelContainer}>
              <label className={clsx(css.label, css.bold)}>
                Write down how much water you will drink:
              </label>
              <input
                autoComplete="off"
                type="text"
                className={clsx(css.input, errors.liters && css.errorInput)}
                {...register('liters')}
                onBlur={e => setLiters(e.target.value)}
                onKeyDown={event =>
                  isNumberAndDot(event, setError, clearErrors)
                }
                onChange={e => maxNumber(e, setError, setValue, clearErrors)}
                maxLength="3"
                max="10"
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
      {isLoading && <Loader />}
    </>
  );
}
