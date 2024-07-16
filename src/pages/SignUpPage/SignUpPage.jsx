import { NavLink } from 'react-router-dom';
import Logo from '../../shared/components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import css from '../SignUpPage/SignUpPage.module.css';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import { ToastContainer } from 'react-toastify';

export default function SignUpPage() {
  return (
    <div className={css.desctopContainer}>
      <div className={css.container}>
        <div className={css.logo}>
          <Logo />
        </div>
        <div className={css.content}>
          <h2 className={css.title}>Sign Up</h2>
          <SignUpForm />
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
      <ToastContainer />
    </div>
  );
}
