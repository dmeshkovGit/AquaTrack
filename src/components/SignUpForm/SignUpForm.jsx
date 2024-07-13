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
    try {
      // запит на реєстрацію user
      const result = await dispatch(registerUser(data));
      if (registerUser.fulfilled.match(result)) {
        reset();
        navigate('/tracker');
      } else if (registerUser.rejected.match(result)) {
        setErrorMessage(result.payload.message || 'Registration failed');
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
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

        <div className={css.inputGroup}>
          <label>Repeat Password</label>
          <div className={css.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Repeat password"
              {...register('password')}
            />{' '}
            <button
              type="button"
              className={css.passwordToggle}
              onClick={toggleShowRepeatPassword}
            >
              {showPassword ? (
                <Icon id="eyeOff" width={20} height={20} />
              ) : (
                <Icon className="icon" id="eye" width={20} height={20} />
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
        <div className={css.link}></div>
      </form>
    </>
  );
}
