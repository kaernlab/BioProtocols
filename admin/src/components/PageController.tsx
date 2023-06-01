import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import Dashboard from './Dashboard/Dashboard';
import Login from './Login/Login';
import Error from './Error';
import useToken from '../hooks/useToken';

function PageController() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Box sx={{ m: 2 }} className="wrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default PageController;
