import { useState } from 'react';
import { TUserToken } from '../utils/types';

// convert sessionStorage->localStorage to persist login state w/ window close
export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      return userToken?.token;
    }
    return '';
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: TUserToken) => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token,
  };
}
