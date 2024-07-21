import css from '../SignInForm/SignInForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon from '../../shared/components/Icon/Icon';
import { useState } from 'react';
import clsx from 'clsx';
import { login } from '../../redux/user/operations';
import { useDispatch, useSelector } from 'react-redux';
import GoogleAuthBtn from '../../shared/components/GoogleAuthBtn/GoogleAuthBtn';
import { selectIsLoading } from '../../redux/user/selectors';
import DotLoader from '../../shared/components/DotLoader/DotLoader.jsx';

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
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const { t, i18n } = useTranslation();

  // об'єкт конфігурації параметрів хука useForm
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = data => {
    dispatch(login(data))
      .then()
      .catch(error => {
        console.error('Unexpected error:', error);
      });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <div
        className={clsx(css.inputGroup, {
          [css.inputGroupUk]: i18n.language === 'uk',
        })}
      >
        <label>{t('Email user')}</label>
        <input
          className={clsx(css.inputGroupInput, errors.email && css.inputError, {
            [css.inputGroupInputUk]: i18n.language === 'uk',
          })}
          type="text"
          placeholder={t('Enter email')}
          name="email"
          autoComplete="on"
          {...register('email')}
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>
      <div
        className={clsx(css.inputGroup, {
          [css.inputGroupUk]: i18n.language === 'uk',
        })}
      >
        <label>{t('Password user')}</label>
        <div className={css.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={t('Enter password')}
            name="password"
            autoComplete="on"
            {...register('password')}
            className={clsx(
              css.inputGroupInput,
              errors.email && css.inputError,
              {
                [css.inputGroupInputUk]: i18n.language === 'uk',
              },
            )}
          />
          <button
            type="button"
            className={css.passwordToggle}
            onClick={toggleShowPassword}
            tabIndex="-1"
          >
            {showPassword ? (
              <Icon className={css.icon} id="eye" width={20} height={20} />
            ) : (
              <Icon className={css.icon} id="eyeOff" width={20} height={20} />
            )}
          </button>
        </div>
        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className={clsx(css.submitButton, {
          [css.submitButtonUk]: i18n.language === 'uk',
        })}
        disabled={!isValid}
      >
        {isLoading ? <DotLoader text="Signing In" /> : t('Login user')}
      </button>
      <GoogleAuthBtn />
    </form>
  );
}
