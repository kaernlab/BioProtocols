import React, { useEffect } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { Box, Button, Grid } from '@mui/material';

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
        {labStartBody && (
        <ReactMarkdown>
          {labStartBody}
        </ReactMarkdown>
        )}
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
