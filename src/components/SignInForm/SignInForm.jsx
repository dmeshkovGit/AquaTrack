import css from '../SignInForm/SignInForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Icon from '../../shared/components/Icon/Icon';
import { useState } from 'react';
import clsx from 'clsx';
import { login } from '../../redux/user/operations';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoading } from '../../redux/user/selectors';
import AuthLoader from '../../shared/components/AuthLoader/AuthLoader';
import { toast } from 'react-hot-toast';

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
      .then(action => {
        if (login.fulfilled.match(action)) {
          toast.success('Login successful');
        } else if (login.rejected.match(action)) {
          const errorMessage = action.payload?.message || 'Login failed';
          const statusCode = action.payload ? action.payload.statusCode : null;

          console.error(
            `Login failed with status code ${statusCode}: ${errorMessage}`,
          );
        }
      })
      .catch(error => {
        // Этот блок не будет выполняться, поскольку dispatch всегда возвращает успешный промис
        console.error('Unexpected error:', error);
      });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={css.inputGroup}>
        <label>Email</label>
        <input
          className={clsx(css.inputGroupInput, errors.email && css.inputError)}
          type="text"
          placeholder="Enter your email"
          name="email"
          autoComplete="on"
          {...register('email')}
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>
      <div className={css.inputGroup}>
        <label>Password</label>
        <div className={css.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            name="password"
            autoComplete="on"
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
        className={css.submitButton}
        disabled={!isValid || isLoading}
      >
        {isLoading ? <AuthLoader /> : 'Sign in'}
      </button>
    </form>
  );
}
