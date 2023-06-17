import React from 'react';
import { Routes as Switch, BrowserRouter, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import PageController from './PageController';
import Login from './Pages/Login/Login';
import Error from './Errors/PageNotFoundError';
import useToken from '../hooks/useToken';
import AppContextProvider from '../context/AppContextProvider';

function Routes() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Box sx={{ m: 2 }} className="wrapper">
      <AppContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" element={<PageController />} />
            <Route path="*" element={<Error />} />
          </Switch>
        </BrowserRouter>
      </AppContextProvider>
    </Box>
  );
}

export default Routes;
