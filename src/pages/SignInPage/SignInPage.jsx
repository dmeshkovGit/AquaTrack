import { Link } from 'react-router-dom';
import Logo from '../../shared/components/Logo/Logo';
import SignInForm from '../../components/SignInForm/SignInForm';
import SignInForm from '../../components/SignInForm/SignInForm';
import css from './SignInPage.module.css';
import Btn from '../../components/Btn/Btn';

const SignInPage = () => {
  const handleSignIn = data => {
    console.log('Form Data:', data);
    // логіка для надсилання даних на сервер
  };
  return (
    <div className={css.container}>
      <Logo />
      <div>
        <h2>Sign In</h2>
      </div>
      <SignInForm onSubmit={handleSignIn} />

      <p>Don`t have an account?</p>
      {/* {<a href="/signup">Sign Up</a> */}
      {/* or use Link */}
      <Link to="/signup">Sign Up</Link>
    </div>
  );
};

export default SignInPage;
