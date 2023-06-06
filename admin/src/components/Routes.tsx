import React from 'react';
import { Routes as Switch, BrowserRouter, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import PageController from './PageController';
import Login from './Login/Login';
import Error from './Pages/Error';
import useToken from '../hooks/useToken';

function Routes() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Box sx={{ m: 2 }} className="wrapper">
      <BrowserRouter>
        <Switch>
          <Route path="/" element={<PageController />} />
          <Route path="*" element={<Error />} />
        </Switch>
      </BrowserRouter>
    </Box>
  );
}

export default Routes;
