import { Link } from 'react-router-dom';
import Logo from '../../shared/components/Logo/Logo';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
export default function SignUpPage() {
  return (
    <div>
      <Logo />
      <SignUpForm />
      <Link to="/"> Home</Link>
    </div>
  );
}
