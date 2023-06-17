import React from 'react';
import { Box } from '@mui/material';
import LoginForm from './LoginForm';
import { IFormValues, ICredentials } from '../../../utils/interfaces';
import { TUserToken } from '../../../utils/types';

async function loginUser(credentials: ICredentials) {
  return fetch('http://localhost:3005/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
      // Handle the error appropriately (e.g., show an error message)
    });
}

function Login(
  { setToken }: {
    setToken: (userToken: TUserToken) => void
  },
) {
  const handleLogin = async (values: IFormValues) => {
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
