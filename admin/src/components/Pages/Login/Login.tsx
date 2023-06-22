/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { Box } from '@mui/material';
import axios from 'axios';
import LoginForm from './LoginForm';
import { IFormValues } from '../../../utils/interfaces';
import { AppContext } from '../../../context/AppContextProvider';
import { TUserToken } from '../../../utils/types';
import { API_URL } from '../../../config';

function Login(
  { setToken }: {
    setToken: (userToken: TUserToken) => void
  },
) {
  const handleLogin = async (values: IFormValues) => {
    /* Integrate with Context Provider later
    onChange({
      action: 'login',
      payload: {
        username: values.username,
        password: values.password,
      },
    });
    */
    axios
      .post(
        `${API_URL}/v1/user/login`,
        {
          username: values.username,
          password: values.password,
        },
      )
      .then((res) => {
        setToken(res.data);
      })
      .catch((e) => console.log(e)); /// TODO: Handle this error better
  };

  return (
    <Box sx={{ m: 2 }}>
      <LoginForm handleLogin={handleLogin} />
    </Box>
  );
}

export default Login;
