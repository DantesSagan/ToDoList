import { Navigate } from 'react-router';
import PropTypes from 'prop-types';

import * as ROUTES from '../constants/routes';

export default function ProtectedRoute({ user, children }) {
  if (user) {
    return children;
  }
  if (!user) {
    return <Navigate to={ROUTES.LOGIN} />;
  }
  return null;
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};

// export default function ProtectedRoute({ user, children, ...rest }) {
//   if (user) {
//     return <Navigate to={ROUTES.DASHBOARD} />;
//   }
//   if (!user) {
//     return <Navigate to={ROUTES.LOGIN} />;
//   }
//   return <Route {...rest} />;
// }

// ProtectedRoute.propTypes = {
//   user: PropTypes.object,
//   children: PropTypes.object.isRequired,
// };
// 1) Delete previous version of ProtectedRoute,
// 2) Simplify previous PR and add to return null like this:
// export default function ProtectedRoute({ user, children }) {
//   if (user) {
//     return children;
//   }
//   if (!user) {
//     return <Navigate to={ROUTES.LOGIN} />;
//   }
//   return null;
// }
// ProtectedRoute.propTypes = {
//   user: PropTypes.object,
//   children: PropTypes.object.isRequired,
// };
// 3) In App component add to Route element={
// <ProtectedRoute user={user}>
// </Dashboard>
// <ProtectedRoute>,
// }
// 4) Watch how it works on site navigation, when you go to default path = "/"  on a Dashboard
// and if you not loggedIn you immediately redirected to login page to Login or SignIn
