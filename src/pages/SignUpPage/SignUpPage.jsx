import { Link } from 'react-router-dom';
import Logo from '../../shared/components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import css from '../SignUpPage/SignUpPage.module.css';

export default function SignUpPage() {
  const handleSignUp = data => {
    console.log('Form Data:', data);
    // логіка для надсилання даних на сервер
  };

  return (
    <div className={css.container}>
      <div className={css.logo}>
        {' '}
        <Logo />
      </div>
      <div className={css.heading}>
        <h2>Sign Up</h2>
      </div>

      <SignUpForm onSubmit={handleSignUp} />
      <p>
        Already have an account?{' '}
        <span>
          <Link to="/signin">Sign In</Link>
        </span>
      </p>
      <Link to="/"> Home</Link>
    </div>
  );
}
