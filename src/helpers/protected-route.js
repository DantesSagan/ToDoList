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
