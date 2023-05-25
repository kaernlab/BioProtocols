import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';

function LabStart(
  { currentLabId, goHome, handleStartLab }:
    {
      currentLabId: string,
      goHome: () => void, handleStartLab: () => void
    }) {
  const [startPageHTML, setStartPageHTML] = useState(`<div>Unable to fetch<div/>`)

  useEffect(() => {
    // Get this from API. Ensure that this HTML is **TRUSTED** in API
    console.log("Now viewing info of labID: ", currentLabId)
    const temp = `<div>This is an example start page<div/>`;

    setStartPageHTML(temp);

  }, [])

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <div dangerouslySetInnerHTML={{ __html: startPageHTML }} />
      </Grid>
      <Grid item>
        <Button variant="outlined" onClick={goHome}>Back to Home</Button>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={handleStartLab}>Start Lab</Button>
      </Grid>
    </Grid>
  );
}

export default LabStart;
