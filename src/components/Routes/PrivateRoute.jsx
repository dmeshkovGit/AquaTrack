import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ component: Component, redirectTo }) {
  const isLoggedIn = true;

  return isLoggedIn ? Component : <Navigate to={redirectTo} />;
}
