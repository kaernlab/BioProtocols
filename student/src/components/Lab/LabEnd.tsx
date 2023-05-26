import React from "react";
import { Button, Grid } from "@mui/material";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

function LabEnd(
  { labEndContent, goHome, restartLab }:
    {
      labEndContent: string,
      restartLab: () => void,
      goHome: () => void
    }) {


  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <ReactMarkdown>{labEndContent ? labEndContent : "Loading"}</ReactMarkdown>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item>
          <Button variant="outlined" onClick={restartLab}>Restart</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={goHome}>Exit</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" >Generate Report</Button>
        </Grid>
      </Grid>
    </Grid >
  )
}

export default LabEnd;