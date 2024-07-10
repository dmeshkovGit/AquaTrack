import { Navigate } from 'react-router-dom';

export default function RestrictedRoute({ component: Component, redirectTo }) {
  const isLoggedIn = false;
  return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
}
