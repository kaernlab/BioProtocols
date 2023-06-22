import React from 'react';
import { Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

function PageNotFoundError() {
  return (
    <Grid container direction="column">
      <Box typography="h6">
        Page not found
      </Box>
      <Box typography="body">
        Go back to
        {' '}
        {' '}
        <Link to="/">
          Dashboard
        </Link>
        ?
      </Box>
    </Grid>
  );
}

export default PageNotFoundError;
