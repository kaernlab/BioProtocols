import React from 'react';
import Landing from './components/Landing';
import { AppBar, Box, Toolbar } from '@mui/material';
import { TopNavbar } from './components/TopNavbar';

function App() {
  return (
    <div>
      <Box sx={{ display: 'flex', width: '100%' }}>
        <AppBar position="fixed">
          <Toolbar sx={{ maxHeight: '70px', minHeight: '56px' }}>
            <TopNavbar />
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ padding: '70px 0px 0px 0px', margin: '0px', width: '100%' }}>
        <Landing />
      </Box>
    </div>
  );
}

export default App;
