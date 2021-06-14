import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

const UserNameRoute = ({ component: Component, ...rest }) => {
  const roomName = rest.computedMatch.params.roomName;

  const { user } = useContext(UserContext);

  const hasUserName = () => {
    if (user.userName) return true;
    return false;
  };

  console.log(rest);
  return (
    <Route
      {...rest}
      render={props =>
        !hasUserName() ? (
          <Redirect
            to={{
              pathname: '/',
              state: { room: roomName }
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
