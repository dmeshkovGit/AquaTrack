import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Logo from '../../shared/components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import css from '../SignUpPage/SignUpPage.module.css';
import AdvantagesSection from '../../components/AdvantagesSection/AdvantagesSection.jsx';
import { register } from '../../redux/user/operations';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async userInfo => {
    try {
      const registerResponse = await dispatch(register(userInfo)).unwrap();
      console.log('Register Response:', registerResponse);

      if (registerResponse) {
        navigate('/tracker');
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      toast.error(`Registration failed: ${error.message}`, {
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
