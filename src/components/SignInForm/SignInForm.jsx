import css from '../SignInForm/SignInForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon from '../../shared/components/Icon/Icon';
import { useState } from 'react';
import clsx from 'clsx';

import { useTranslation } from 'react-i18next';
import '../../translate/index.js';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = data => console.log(data);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputGroup}>
          <label>{t('Email user')}</label>
          <input
            className={clsx(
              css.inputGroupInput,
              errors.email && css.inputError,
            )}
            type="text"
            placeholder={t('Enter email')}
            {...register('email')}
          />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>
        <div className={css.inputGroup}>
          <label>{t('Password user')}</label>
          <div className={css.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={t('Enter password')}
              {...register('password')}
              className={clsx(
                css.inputGroupInput,
                errors.password && css.inputError,
              )}
            />

            <button
              type="button"
              className={css.passwordToggle}
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <Icon className={css.icon} id="eye" width={18} height={18} />
              ) : (
                <Icon className={css.icon} id="eyeOff" width={20} height={20} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className={css.submitButton} onClick={onSubmit}>
          {t('Login user')}
        </button>
        {/* <div className={css.link}></div> */}
      </form>
    </>
  );
}
