import React, { cloneElement } from 'react';
import { Route, Navigate, Routes } from 'react-router';
import PropTypes from 'prop-types';

import * as ROUTES from '../constants/routes';

export default function ProtectedRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return cloneElement(children, { user });
        }
        if (!user) {
          return (
            <Navigate
              to={{
                pathname: ROUTES.LOGIN,
                state: { from: location, error: 'You need to login first!' },
              }}
            />
          );
        }
        return null;
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};
