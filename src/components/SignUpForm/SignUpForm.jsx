// src/components/SignUpForm.js
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
// import { registerUser } from '../redux/auth/operations'; // створити операцію registerUser в Redux
// import { selectLoading, selectError } from '../redux/auth/selectors'; // створити в Redux
// import { useHistory } from 'react-router-dom';
import css from './SignUpForm.module.css';
import Btn from '../Btn/Btn.jsx';

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

const SignUpForm = () => {
  const { dispatch, useSelector } = useDispatch();
  // const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  // const history = useHistory();
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

  // ф-ція обробник відображення Password
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async data => {
    // запит на реєстрацію user
    try {
      await dispatch(registerUser(data));
      history.push('/tracker');
      result => {
        if (register.fulfilled.match(result)) {
          reset(); // скидаємо форму
        } else if (register.rejected.match(result)) {
          setErrorMessage(result.payload.message || 'Registration failed');
        }
      };
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <form className={css.signup - form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.form - group}>
        <Controller
          name="email"
          control={register}
          defaultValue=""
          render={({ field }) => (
            <>
              <label>Email</label>
              <input {...field} type="email" />
              {errors.email && (
                <p className={css.error}>{errors.email.message}</p>
              )}
            </>
          )}
        />
      </div>
      <div className={css.form - group}>
        <Controller
          name="password"
          control={register}
          defaultValue=""
          render={({ field }) => (
            <>
              <label>Password</label>
              <input {...field} type="password" />
              {errors.password && (
                <p className={css.error}>{errors.password.message}</p>
              )}
            </>
          )}
        />
      </div>
      <div className={css.form - group}>
        <Controller
          name="repeatPassword"
          control={register}
          defaultValue=""
          render={({ field }) => (
            <>
              <label>Repeat Password</label>
              <input {...field} type="password" />
              {errors.repeatPassword && (
                <p className={css.error}>{errors.repeatPassword.message}</p>
              )}
            </>
          )}
        />
      </div>
      {error && <p className={css.error}>{errorMessage}</p>}
      <Btn
        className={css.btn}
        type="submit"
        disabled={loading}
        onClick={onSubmit}
      >
        Sign Up
      </Btn>
    </form>
  );
};

export default SignUpForm;
