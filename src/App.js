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
const Profile = lazy(() => import('./pages/profile'));
const Setting = lazy(() => import('./Components/profile/setting'));
const DashboardDisplayToDo = lazy(() =>
  import('./Components/toDoApp/displayToDo/dashboard.displayToDo')
);
const DashboardDisplayNestedToDo = lazy(() =>
  import('./Components/toDoApp/nestedToDo/dashboardNestedToDo')
);
const DashboardSubToDo = lazy(() =>
  import(
    './Components/toDoApp/displayToDo/subcollectionToDo/sub.dashboardNestedToDo'
  )
);
const ForgottenEmail = lazy(() =>
  import('./pages/handles/handle.ForgottenEmail')
);
const ForgottenPassword = lazy(() =>
  import('./pages/handles/handle.ForgottenPassword')
);
export default function App() {
  const { user } = useAuthListener();
  return (
    <div className='bg'>
      <UserContext.Provider value={{ user }}>
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
              <Route
                path={ROUTES.FORGOTTENEMAIL}
                element={<ForgottenEmail />}
              />
              <Route
                path={ROUTES.FORGOTTENPASSWORD}
                element={<ForgottenPassword />}
              />
              <Route
                path={ROUTES.TODOLIST}
                element={
                  <ProtectedRoute user={user}>
                    <DashboardDisplayToDo />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.SUBCOLLECTION}
                element={
                  <ProtectedRoute user={user}>
                    <DashboardSubToDo />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.NESTEDTODOLIST}
                element={
                  <ProtectedRoute user={user}>
                    <DashboardDisplayNestedToDo />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.DASHBOARD}
                element={
                  <ProtectedRoute user={user}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.PROFILE}
                element={
                  <ProtectedRoute user={user}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path={ROUTES.SETTINGS}
                element={
                  <ProtectedRoute user={user}>
                    <Setting />
                  </ProtectedRoute>
                }
              />
              <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}
