import { NavLink } from 'react-router-dom';

import Logo from '../../shared/components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import css from '../SignUpPage/SignUpPage.module.css';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';

export default function SignUpPage() {
  const handleSignUp = data => {
    console.log('Form Data:', data);
    // логіка для надсилання даних на сервер
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
            Already have an account?
            <NavLink className={css.navLink} to="/signin">
              {' '}
              Sign In
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
