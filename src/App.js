import { Router, Route } from 'react-router';
import { lazy } from 'react';

import AppMain from './Components/AppMain';
import UserContext from './context/user';
import useAuthListener from './hooks/use-auth-listener';

import * as ROUTES from '../src/constants/routes';
import ProtectedRoute from './helpers/protected-route';

import './App.css';

const Login = lazy(() => import('./Components/AppMain'));
const Dashboard = lazy(() => import('./pages/dashboard'));

export default function App() {
  const { user } = useAuthListener();
  return (
    <div className='App mt-24 text-center text-3xl'>
      <UserContext.Provider value={{ user }}>
        <AppMain />
        <Router>
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <ProtectedRoute user={user} path={ROUTES.DASHBOARD}>
            <Route element={<Dashboard />} />
          </ProtectedRoute>
        </Router>
      </UserContext.Provider>
    </div>
  );
}
