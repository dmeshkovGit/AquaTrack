import css from '../UserSettingsForm/UserSettingsForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import clsx from 'clsx';
import FormulaDescription from './FormulaDescription';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/user/selectors';
import { updateUser } from '../../redux/user/operations';
import toastMaker from '../../shared/helpers/toastMaker/toastMaker.jsx';
import { isNumberAndDot, maxNumber } from '../../helpers/validationsHelper';
import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import AppSettingsForm from '../AppSettingsForm/AppSettingsForm.jsx';
import { IoIosArrowDown } from 'react-icons/io';

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
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

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
  }, [gender, activity, weight, user, setValue, liters]);

  const onSubmit = data => {
    dispatch(updateUser({ _id: user._id, ...data }))
      .unwrap()
      .then(() => {
        isModalOpen(false);
        toastMaker('Profile was successfully updated', 'succes');
      })
      .catch(() => toastMaker('Sorry, try again later', 'error'));
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
          <legend
            className={clsx(css.legend, {
              [css.legendUk]: i18n.language === 'uk',
            })}
          >
            {t('Your gender')}
          </legend>
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
              <span
                className={clsx(css.label, {
                  [css.labelUk]: i18n.language === 'uk',
                })}
              >
                {t('Woman gender')}
              </span>
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
              <span
                className={clsx(css.label, {
                  [css.labelUk]: i18n.language === 'uk',
                })}
              >
                {t('Man gender')}
              </span>
            </label>
          </div>
        </fieldset>
        <div className={css.columnsWrapper}>
          <div className={css.leftPart}>
            <div className={css.labelContainer}>
              <label
                className={clsx(css.label, css.bold, {
                  [css.labelUk]: i18n.language === 'uk',
                })}
                {...register('name')}
              >
                {t('Your name')}
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
                className={clsx(css.label, css.bold, {
                  [css.labelUk]: i18n.language === 'uk',
                })}
                {...register('email')}
              >
                {t('Your email')}
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
              <label
                className={clsx(css.label, {
                  [css.labelUk]: i18n.language === 'uk',
                })}
                {...register('weight')}
              >
                {t('Your weight')}
              </label>
              <input
                autoComplete="off"
                type="text"
                className={clsx(css.input, errors.weight && css.errorInput)}
                {...register('weight')}
                onKeyDown={event =>
                  isNumberAndDot(event, setError, clearErrors)
                }
                onChange={e => {
                  maxNumber(e, setError, setValue, clearErrors);
                  setWeight(e.target.value);
                }}
                maxLength="3"
                max="500"
              />
              {errors.weight && (
                <p className={css.errorText}>{errors.weight.message}</p>
              )}
            </div>
            <div className={css.labelContainer}>
              <label
                className={clsx(css.label, {
                  [css.labelUk]: i18n.language === 'uk',
                })}
                {...register('activeTime')}
              >
                {t('Time active')}
              </label>
              <input
                autoComplete="off"
                type="text"
                className={clsx(css.input, errors.activeTime && css.errorInput)}
                {...register('activeTime')}
                onKeyDown={event =>
                  isNumberAndDot(event, setError, clearErrors)
                }
                onChange={e => {
                  maxNumber(e, setError, setValue, clearErrors);
                  setActivity(e.target.value);
                }}
                maxLength="3"
                max="24"
              />
              {errors.activeTime && (
                <p className={css.errorText}>{errors.activeTime.message}</p>
              )}
            </div>
            <p
              className={clsx(css.waterAmount, {
                [css.waterAmountUk]: i18n.language === 'uk',
              })}
            >
              {t('Required amount')}{' '}
              <span
                className={clsx(css.accent, {
                  [css.accentUk]: i18n.language === 'uk',
                })}
              >
                {waterVolume.toFixed(1)} {t('Count water')}
              </span>
            </p>
            <div className={css.labelContainer}>
              <label
                className={clsx(css.label, css.bold, {
                  [css.labelUk]: i18n.language === 'uk',
                })}
              >
                {t('Write down')}
              </label>
              <input
                autoComplete="off"
                type="text"
                className={clsx(css.input, errors.liters && css.errorInput)}
                {...register('liters')}
                onKeyDown={event =>
                  isNumberAndDot(event, setError, clearErrors)
                }
                onChange={e => {
                  maxNumber(e, setError, setValue, clearErrors);
                  setLiters(e.target.value);
                }}
                maxLength="3"
                max="10"
              />
              {errors.liters && (
                <p className={css.errorText}>{errors.liters.message}</p>
              )}
            </div>
          </div>
        </div>
        <details className={clsx(css.details, css.appDetails)}>
          <summary
            className={clsx(css.summary, {
              [css.summaryUk]: i18n.language === 'uk',
            })}
          >
            {t('App settings')}{' '}
            <IoIosArrowDown className={clsx(css.icon, css.appIcon)} />
          </summary>
          <AppSettingsForm />
        </details>
        <button
          type="submit"
          className={clsx(css.saveBtn, {
            [css.saveBtnUk]: i18n.language === 'uk',
          })}
        >
          {t('Save setting')}
        </button>
      </form>
    </>
  );
}
