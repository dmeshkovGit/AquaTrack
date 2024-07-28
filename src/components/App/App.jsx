import { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import RestrictedRoute from '../Routes/RestrictedRoute';
import PrivateRoute from '../Routes/PrivateRoute';
import '../App/App.css';
import SignUpPage from '../../pages/SignUpPage/SignUpPage';
import SignInPage from '../../pages/SignInPage/SignInPage';
import TrackerPage from '../../pages/TrackerPage/TrackerPage';
import SharedLayout from '../SharedLayout/SharedLayout';
import HomePage from '../../pages/HomePage/HomePage';
import { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { refreshUserToken } from '../../redux/user/operations';
import '../../translate/index.js';
import WaterLoader from '../../shared/components/WaterLoader/WaterLoader.jsx';
import RefreshLoader from '../RefreshLoader/RefreshLoader.jsx';
import { selectIsRefreshing } from '../../redux/user/selectors.js';

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshUserToken());
  }, [dispatch]);

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
        }}
      />

      <SharedLayout>
        {isRefreshing ? (
          <RefreshLoader />
        ) : (
          <Suspense fallback={<WaterLoader />}>
            <Routes>
              <Route
                path="/"
                element={
                  <RestrictedRoute
                    component={<HomePage />}
                    redirectTo="/tracker"
                  />
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
        )}
      </SharedLayout>
    </>
  );
}

export default App;
