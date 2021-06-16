import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { UserContext } from '../../context/UserContext';

const UserNameRoute = ({ component: Component, ...rest }) => {
  const roomName = rest?.computedMatch?.params?.roomName;
  const { user } = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={(props) =>
        !user.userName ? (
          <Redirect
            to={{
              pathname: '/',
              state: { room: roomName },
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
