import { Router, Route } from 'react-router';
import { lazy, Suspense } from 'react';

import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';

import * as ROUTES from '../src/constants/routes';
import ProtectedRoute from './helpers/protected-route';

import './App.css';

const Login = lazy(() => import('./pages/login'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const SignUp = lazy(() => import('./pages/signUp'));

export default function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
        <Suspense fallback={{}}>
          <Router>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD}>
              <Route element={<Dashboard />} />
            </ProtectedRoute>
          </Router>
        </Suspense>
    </UserContext.Provider>
  );
}
