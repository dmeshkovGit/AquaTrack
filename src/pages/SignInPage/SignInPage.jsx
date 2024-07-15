import { Link } from 'react-router-dom';
import Logo from '../../shared/components/Logo/Logo';
import SignInForm from '../../components/SignInForm/SignInForm';
import css from '../SignInPage/SignInPage.module.css';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';

export default function SignIpPage() {
  const handleSignIn = data => {
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
          <h2 className={css.title}>Sign in</h2>

          <SignInForm onSubmit={handleSignIn} />

          <p className={css.notify}>
            Don`t have an account?
            <Link className={css.navLink} to="/signup">
              {' '}
              Sign Up
            </Link>
          </p>
        </div>
      </div>
      <div className={css.advantagesSection}>
        <AdvantagesSection />
      </div>
    </div>
  );
}
