import { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import RestrictedRoute from '../Routes/RestrictedRoute';
import PrivateRoute from '../Routes/PrivateRoute';
import '../App/App.css';
// import WelcomeSection from '../WelcomeSection/WelcomeSection';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import TrackerPage from '../../pages/TrackerPage/TrackerPage';
import SharedLayout from '../SharedLayout/SharedLayout';
import HomePage from '../../pages/HomePage/HomePage';

function App() {
  return (
    <SharedLayout>
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={
              <RestrictedRoute component={<HomePage />} redirectTo="/tracker" />
            }
          />
          <Route
            path="/signup"
            element={
              <RestrictedRoute
                component={<SignUpPage />}
                redirectTo="/tracker"
              />
            }
          />
          <Route
            path="/signin"
            element={
              <RestrictedRoute
                component={<SignInPage />}
                redirectTo="/tracker"
              />
            }
          />
          <Route
            path="/tracker"
            element={
              <PrivateRoute component={<TrackerPage />} redirectTo="/" />
            }
          />
        </Routes>
      </Suspense>
    </SharedLayout>
  );
}

export default App;
