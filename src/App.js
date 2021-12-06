import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy, Suspense, useState } from 'react';
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
const Profile = lazy(() => import('./Components/profile/index'));
export default function App() {
  const { user } = useAuthListener();
  const { token } = useState(null);
  return (
    <UserContext.Provider value={{ user }}>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </UserContext.Provider>
  );
}
