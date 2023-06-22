import React from 'react';
import { Box, Grid } from '@mui/material';

function GenericError({ msg }:{ msg:string }) {
  return (
    <Grid container direction="column">
      <Box typography="h6">
        Some error occured
      </Box>
      <Box typography="body">
        {msg || ''}
      </Box>
    </Grid>
  );
}

export default GenericError;
