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
      <Logo />
      <h2>Sign Up</h2>
      <SignUpForm onSubmit={handleSignUp} />
      <p>
        Already have an account? <a href="/signin">Sign In</a>
        {/* or use Link */}
        <Link to="/signin">Sign In</Link>
      </p>
      <Link to="/"> Home</Link>
    </div>
  );
}
