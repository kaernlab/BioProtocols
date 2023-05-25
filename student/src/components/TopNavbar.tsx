import React from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function TopNavbar() {
  return (
    <Grid container direction="row" justifyContent="space-between">
      <Grid item>
        <Box typography="h5">
          BioProtocols
        </Box>
        <Box typography="subtitle2">
          Student version
        </Box>
      </Grid>
      <Grid item>
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default TopNavbar;