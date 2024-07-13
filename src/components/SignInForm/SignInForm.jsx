import css from '../SignInForm/SignInForm.module.css';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    try {
      // Backend request for sign in
      const response = await fetch('https://backend-api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Sign in failed');
      }

      // Save token and redirect to TrackerPage
      localStorage.setItem('token', result.token);
      history.push('/tracker');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.inputGroup}>
        <label>Email</label>
        <input type="email" placeholder="Email" {...register('email')} />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>
      <div className={css.inputGroup}>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          {...register('password')}
        />
        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}
      </div>
      <button type="submit" className={css.submitButton}>
        Sign In
      </button>
      <div className={css.link}></div>
    </form>
  );
}
