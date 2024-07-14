import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from '../SignUpForm/SignUpForm.module.css';
import Icon from '../../shared/components/Icon/Icon';
import clsx from 'clsx';
// import registerUser from '../../redux/auth/operations';
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Repeat Password is required'),
});

export default function SignUpForm() {
  const dispatch = useDispatch();
  // const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  // об'єкт конфігурації параметрів хука useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema), // інтеграція схеми валідації yup в react-hook-form.
  });

  const onSubmit = async data => {
    // запит на реєстрацію user dispatch(registerUser(data))
    console.log(data);
    // try {
    //   const result = await dispatch(registerUser(data));
    //   if (registerUser.fulfilled.match(result)) {
    //     reset();
    //     navigate('/tracker');
    //   } else if (registerUser.rejected.match(result)) {
    //     setErrorMessage(result.payload.message || 'Registration failed');
    //   }
    // } catch (err) {
    //   setErrorMessage(err.message);
    // }
  };

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const toggleShowRepeatPassword = () => {
    setShowRepeatPassword(prev => !prev);
  };

  return (
    <>
      <ToastContainer />
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className={clsx(
              css.inputGroupInput,
              errors.email && css.inputError,
            )}
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
            >
              {showPassword ? (
                <Icon className={css.icon} id="eye" width={18} height={18} />
              ) : (
                <Icon className={css.icon} id="eyeOff" width={18} height={18} />
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
              type={showRepeatPassword ? 'text' : 'password'}
              placeholder="Repeat password"
              {...register('repeatPassword')}
              className={clsx(
                css.inputGroupInput,
                errors.repeatPassword && css.inputError,
              )}
            />
            <button
              type="button"
              className={css.passwordToggle}
              onClick={toggleShowRepeatPassword}
            >
              {showRepeatPassword ? (
                <Icon className={css.icon} id="eye" width={18} height={18} />
              ) : (
                <Icon className={css.icon} id="eyeOff" width={18} height={18} />
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
          // disabled={loading}
          onClick={onSubmit}
        >
          Sign Up
        </button>
      </form>
    </>
  );
}
