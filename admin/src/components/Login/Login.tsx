import React from 'react';
import { Box } from '@mui/material';
import LoginForm from './LoginForm';
import { FormValues, Credentials } from '../../utils/interfaces';
import { TUserToken } from '../../utils/types';

async function loginUser(credentials: Credentials) {
  return fetch('http://localhost:3005/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => response.json());
}

function Login(
  { setToken }: {
    setToken: (userToken: TUserToken) => void
  },
) {
  const handleLogin = async (values: FormValues) => {
    const token = await loginUser({
      username: values.username,
      password: values.password,
    });
    if (token.error) {
      throw new Error(token.error);
    }
    setToken(token);
  };

  return (
    <Box sx={{ m: 2 }}>
      <LoginForm handleLogin={handleLogin} />
    </Box>
  );
}

export default Login;
