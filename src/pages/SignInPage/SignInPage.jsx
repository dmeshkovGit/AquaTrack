import { Link } from 'react-router-dom';
import Logo from '../../shared/components/Logo/Logo';
import SignInForm from '../../components/SignInForm/SignInForm';
import css from './SignInPage.module.css';

export default function SignIpPage() {
  const handleSignIn = data => {
    console.log('Form Data:', data);
    // логіка для надсилання даних на сервер
  };
  return (
    <div className={css.container}>
      <div className={css.logo}>
        <Logo />
      </div>

      <div className={css.heading}>
        <h2>sign in</h2>
      </div>
      <SignInForm onSubmit={handleSignIn} />

      <p>
        Don`t have an account?
        <span>
          <Link to="/signup">Sign Up</Link>
        </span>
      </p>
      <Link to="/"> Home</Link>
    </div>
  );
}
