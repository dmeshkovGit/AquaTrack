import { Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import RestrictedRoute from '../Routes/RestrictedRoute';
import PrivateRoute from '../Routes/PrivateRoute';
// import WelcomeSection from '../WelcomeSection/WelcomeSection';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import TrackerPage from '../../pages/TrackerPage/TrackerPage';

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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </SharedLayout>
  );
}

export default App;
