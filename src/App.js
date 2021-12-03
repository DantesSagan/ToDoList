import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';

import * as ROUTES from '../src/constants/routes';
import ProtectedRoute from './helpers/protected-route';

import Loader from './fallback/loader';

import './App.css';

const Login = lazy(() => import('./pages/login'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const SignUp = lazy(() => import('./pages/signUp'));
const NotFound = lazy(() => import('./pages/not-found'));

export default function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            <Route
              // user={user}
              path={ROUTES.DASHBOARD}
              element={<Dashboard />}
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
