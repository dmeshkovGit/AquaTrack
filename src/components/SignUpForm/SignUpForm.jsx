import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import css from '../SignUpForm/SignUpForm.module.css';
import Icon from '../../shared/components/Icon/Icon';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { register as registerUser } from '../../redux/user/operations';
import GoogleAuthBtn from '../../shared/components/GoogleAuthBtn/GoogleAuthBtn';
import { selectIsLoading } from '../../redux/user/selectors';
import AuthLoader from '../../shared/components/AuthLoader/AuthLoader';
import { toast } from 'react-hot-toast';
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  // проверять инпут password == repeatPassword
  // .test('passwords-match', 'Passwords must match', function (value) {
  //   return value === this.parent.repeatPassword;
  // })
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Repeat Password is required'),
});

export default function SignUpForm() {
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
    const { email, password } = data;
    dispatch(registerUser({ email, password }))
      .then(action => {
        if (registerUser.fulfilled.match(action)) {
          toast.success('Register successful');
        } else if (registerUser.rejected.match(action)) {
          const errorMessage = action.payload?.message || 'Login failed';
          const statusCode = action.payload ? action.payload.statusCode : null;

          console.error(
            `Login failed with status code ${statusCode}: ${errorMessage}`,
          );
        }
      })
      .catch(error => {
        console.error('Unexpected error:', error);
      });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={css.inputGroup}>
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter your email"
          name="email"
          autoComplete="off"
          className={clsx(css.inputGroupInput, errors.email && css.inputError)}
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
            autoComplete="new-password"
            className={clsx(
              css.inputGroupInput,
              errors.password && css.inputError,
            )}
            {...register('password')}
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
      <div className={css.inputGroup}>
        <label>Repeat Password</label>
        <div className={css.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Repeat password"
            name="repeatPassword"
            autoComplete="password-confirmation"
            {...register('repeatPassword')}
            className={clsx(
              css.inputGroupInput,
              errors.repeatPassword && css.inputError,
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
        {errors.repeatPassword && (
          <p className={css.error}>{errors.repeatPassword.message}</p>
        )}
      </div>
      <button
        className={css.submitButton}
        type="submit"
        disabled={!isValid || isLoading}
      >
        {isLoading ? <AuthLoader /> : 'Sign Up'}
      </button>
      <GoogleAuthBtn />
    </form>
  );
}
