import React from "react";
import { Button, Grid } from "@mui/material";

function LabEnd({ goHome, restartLab }: { restartLab: () => void, goHome: () => void }) {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        Lab has ended
      </Grid>
      <Grid item >
        <Button variant="outlined" onClick={restartLab}>Restart</Button>
        <Button variant="contained" onClick={goHome}>Exit</Button>
        <Button variant="outlined" >Generate Report</Button>
      </Grid>
    </Grid >
  )
}

export default LabEnd;