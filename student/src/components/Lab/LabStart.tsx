import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, Button, Grid } from '@mui/material';

function LabStart(
  { title, labStartBody, goHome, handleStartLab }:
    {
      title: string,
      labStartBody: string,
      goHome: () => void,
      handleStartLab: () => void
    }) {

  // TODO: Have React Markdown render with MUI styles
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Box typography="h4">
          {title ? title : "Loading"}
        </Box>
      </Grid>
      <Grid item>
        <Box sx={{ typography: "body", fontFamily: "Roboto" }}>
          <ReactMarkdown children={labStartBody ? labStartBody : "Loading"} />
        </Box>
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
