import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Logo from '../../shared/components/Logo/Logo';
import SignInForm from '../../components/SignInForm/SignInForm';
import css from '../SignInPage/SignInPage.module.css';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import { login } from '../../redux/user/operations';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async userInfo => {
    try {
      const loginResponse = await dispatch(login(userInfo)).unwrap();
      console.log('Login Response:', loginResponse);

      if (loginResponse) {
        navigate('/tracker');
      }
    } catch (error) {
      console.error('Login failed:', error.message);
      toast.error(`Login failed: ${error.message}`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
            Don`t have an account?{' '}
            <Link className={css.navLink} to="/signup">
              sign up
            </Link>
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
