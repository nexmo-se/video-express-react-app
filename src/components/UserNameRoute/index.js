import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

import useUserName from '../../hooks/useUserName';

const UserNameRoute = ({ component: Component, ...rest }) => {
  const { hasUserName } = useUserName();
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={props =>
        !hasUserName() ? (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default UserNameRoute;
