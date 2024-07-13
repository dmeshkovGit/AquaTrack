import css from '../SignInForm/SignInForm.module.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Icon from '../../shared/components/Icon/Icon';
import { useState } from 'react';

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
  // const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // об'єкт конфігурації параметрів хука useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    try {
      // Backend request for sign in
      const result = await dispatch(loginUser(data));
      if (loginUser.fulfilled.match(result)) {
        reset();
        // Save token and redirect to TrackerPage
        localStorage.setItem('token', result.token);
        navigate('/tracker');
      } else if (loginUser.rejected.match(result)) {
        setErrorMessage(result.payload.message || 'Sign in failed');
      }
    } catch (error) {
      toast.error(error.message);
      setErrorMessage(err.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <>
      <ToastContainer />
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={css.inputGroup}>
          <label>Email</label>
          <input type="email" placeholder="Email" {...register('email')} />
          {errors.email && <p className={css.error}>{errors.email.message}</p>}
        </div>
        <div className={css.inputGroup}>
          <label>Password</label>
          <div className={css.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              {...register('password')}
            />

            <button
              type="button"
              className={css.passwordToggle}
              onClick={toggleShowPassword}
            >
              {showPassword ? (
                <Icon id="eyeOff" width={20} height={20} />
              ) : (
                <Icon className="icon" id="eye" width={20} height={20} />
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
          // disabled={loading}
          onClick={onSubmit}
        >
          Sign In
        </button>
        <div className={css.link}></div>
      </form>
    </>
  );
}
