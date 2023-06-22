import React, { useEffect } from 'react';
import { Box, Button, Grid } from '@mui/material';
import parse from 'html-react-parser';

function LabStart(
  {
    title, labStartBody, goHome, handleStartLab,
  }:
  {
    title: string,
    labStartBody: string,
    goHome: () => void,
    handleStartLab: () => void
  },
) {
  useEffect(() => {
    // clear existing elapsedTime or set blank
    localStorage.setItem('elapsedTime', '');
  }, []);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Box typography="h4">
          {title}
        </Box>
      </Grid>
      <Grid item>
        {parse(labStartBody || 'Loading')}
      </Grid>
      <Grid item container spacing={2}>
        <Grid item>
          <Button variant="contained" onClick={handleStartLab}>Start Lab</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={goHome}>Back to Home</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LabStart;
