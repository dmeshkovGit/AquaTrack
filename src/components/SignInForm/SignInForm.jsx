import css from '../SignInForm/SignInForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
  const [showPassword, setShowPassword] = useState(false);

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
                <Icon
                  className="eyeOffIcon"
                  id="eyeOff"
                  width={20}
                  height={20}
                />
              ) : (
                <Icon className="eyeIcon" id="eye" width={20} height={20} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className={css.error}>{errors.password.message}</p>
          )}
        </div>
        <button type="submit" className={css.submitButton} onClick={onSubmit}>
          Sign In
        </button>
        <div className={css.link}></div>
      </form>
    </>
  );
}
