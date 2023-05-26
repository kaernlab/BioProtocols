import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

function LabEnd(
  { labEndContent, goHome, restartLab }:
    {
      labEndContent: string,
      restartLab: () => void,
      goHome: () => void
    }) {

  const [timeElapsed, setTimeElapsed] = useState("");

  useEffect(() => {
    const time = localStorage.getItem("elapsedTime") || "";

    if (time !== "") {
      const obj = JSON.parse(time);
      setTimeElapsed(`${obj.hours}:${obj.minutes}:${obj.seconds}`);
    }
  }, [])


  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <ReactMarkdown>{labEndContent ? labEndContent : "Loading"}</ReactMarkdown>
      </Grid>
      <Grid item>
        <Box typography="body1">
          Time elapsed: {timeElapsed}
        </Box>
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