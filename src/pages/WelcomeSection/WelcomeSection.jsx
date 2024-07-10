import { Link } from 'react-router-dom';

export default function WelcomeSection() {
  return (
    <div>
      <Link to="/signin">Sign In</Link>
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}
