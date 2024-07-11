import { Link } from 'react-router-dom';
import Logo from '../../shared/components/Logo/Logo';

export default function WelcomeSection() {
  return (
    <div>
      <Logo />
      <Link to="/signin">Sign In</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}
