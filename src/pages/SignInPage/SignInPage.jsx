import { Link } from 'react-router-dom';
import Logo from '../../shared/components/Logo/Logo';
import SignInForm from '../../components/SignInForm/SignInForm';
export default function SignIpPage() {
  return (
    <div>
      <Logo />
      <SignInForm />
      <Link to="/"> Home</Link>
    </div>
  );
}
