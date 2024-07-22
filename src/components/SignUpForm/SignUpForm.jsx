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
import DotLoader from '../../shared/components/DotLoader/DotLoader.jsx';
import { useTranslation } from 'react-i18next';
import '../../translate/index.js';
import SignUpModal from '../SignUpModal/SignUpModal.jsx';
import Modal from '../../shared/components/Modal/Modal.jsx';

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
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isLoading = useSelector(selectIsLoading);
  const { t, i18n } = useTranslation();

  // об'єкт конфігурації параметрів хука useForm
  const {
    register,
    handleSubmit,
    reset,
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
          // toast.success('Register successful');
          reset();
          setIsModalOpen(true);
        }
        // else if (registerUser.rejected.match(action)) {
        //   const errorMessage = action.payload?.message || 'Login failed';
        //   const statusCode = action.payload ? action.payload.statusCode : null;

        //   console.error(
        //     `Login failed with status code ${statusCode}: ${errorMessage}`,
        //   );
        // }
      })
      .catch(error => {
        console.error('Unexpected error:', error);
      });
  };

  // const handleModalConfirm = () => {
  //   Логика при нажатии кнопки "Pease verify emai" в модалке
  //   dispatch(logout())
  //     .unwrap()
  //     .then(() => setIsModalOpen(false))
  //     .catch(() => toast.error(t('Sorry, try again later')));
  // };

  const handleModalCancel = () => {
    // Логика при нажатии кнопки "Cancel" в модалке
    setIsModalOpen(false);
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          children={<SignUpModal />}
          isOpen={setIsModalOpen}
          onClose={handleModalCancel}
          // btnClassName={''}
        />
      )}
      <form className={css.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <div
          className={clsx(css.inputGroup, {
            [css.inputGroupUk]: i18n.language === 'uk',
          })}
        >
          <label>{t('Email user')}</label>
          <input
            type="text"
            placeholder={t('Enter email')}
            name="email"
            autoComplete="off"
            className={clsx(
              css.inputGroupInput,
              errors.email && css.inputError,
              {
                [css.inputGroupInputUk]: i18n.language === 'uk',
              },
            )}
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
              autoComplete="new-password"
              className={clsx(
                css.inputGroupInput,
                errors.email && css.inputError,
                {
                  [css.inputGroupInputUk]: i18n.language === 'uk',
                },
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
        <div
          className={clsx(css.inputGroup, {
            [css.inputGroupUk]: i18n.language === 'uk',
          })}
        >
          <label>{t('Repeat password')}</label>
          <div className={css.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder={t('Repeat password')}
              name="repeatPassword"
              autoComplete="password-confirmation"
              {...register('repeatPassword')}
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
          {errors.repeatPassword && (
            <p className={css.error}>{errors.repeatPassword.message}</p>
          )}
        </div>

        <button
          className={clsx(css.submitButton, {
            [css.submitButtonUk]: i18n.language === 'uk',
          })}
          type="submit"
          disabled={!isValid}
        >
          {isLoading ? (
            <DotLoader text="Signing Up" />
          ) : (
            t('Register user form')
          )}
        </button>
        <GoogleAuthBtn />
      </form>
    </>
  );
}
