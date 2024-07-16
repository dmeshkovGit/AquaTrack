import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Logo from '../../shared/components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import css from '../SignUpPage/SignUpPage.module.css';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import { register } from '../../redux/user/operations';

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async userInfo => {
    console.log('userInfo:', userInfo);

    try {
      const response = await dispatch(register(userInfo)).unwrap();
      console.log('Response:', response.data);

      // Перевірка, якщо реєстрація пройшла успішно
      if (response) {
        // перенаправити користувача або показати повідомлення про успіх
        navigate('/tracker');
      }
    } catch (error) {
      // Обробка помилки реєстрації
      if (error.response && error.response.status === 409) {
        console.error('Registration failed: Email already exists');
      } else {
        console.error('Registration failed:', error);
      }
    }
  };

  return (
    <div className={css.desctopContainer}>
      <div className={css.container}>
        <div className={css.logo}>
          <Logo />
        </div>
        <div className={css.content}>
          <h2 className={css.title}>Sign Up</h2>
          <SignUpForm onSubmit={handleSignUp} />
          <p className={css.notify}>
            Already have an account?{' '}
            <NavLink className={css.navLink} to="/signin">
              sign in
            </NavLink>
          </p>
        </div>
      </div>
      <div className={css.advantagesSection}>
        <AdvantagesSection />
      </div>
    </div>
  );
}
