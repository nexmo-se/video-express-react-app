import { UserContext } from '../context/UserContext';
import React, { useContext } from 'react';

export default function useUserName() {
  const { user } = useContext(UserContext);

  const hasUserName = () => {
    if (user.userName) return true;
    return false;
  };

  return {
    hasUserName
  };
}
