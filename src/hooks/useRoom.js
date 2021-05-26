import React, { useCallback, useRef, useState } from 'react';

export default function useRoom() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return userToken?.accessToken;
  };
  const history = useHistory();

  const getUserFromToken = () => {
    const token = getToken();
    const { id, email, first, last, roomId } = jwtDecode(token);
    return { id, email, first, last, roomId };
  };

  return {
    saveToken: saveToken,
    getUserFromToken: getUserFromToken,
    getToken: getToken
  };
}
