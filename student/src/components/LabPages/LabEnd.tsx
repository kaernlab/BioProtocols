import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import parse from 'html-react-parser';
import TimerDisplay from '../Timer/TimerDisplay';
import { ITime } from '../../utils/interfaces';

function LabEnd(
  { labEndContent, goHome, restartLab }:
  {
    labEndContent: string,
    restartLab: () => void,
    goHome: () => void
  },
) {
  const [timeElapsed, setTimeElapsed] = useState<ITime>({
    hours: 0, minutes: 0, seconds: 0,
  });

  useEffect(() => {
    const time = localStorage.getItem('elapsedTime') || '';

    if (time !== '') {
      setTimeElapsed(JSON.parse(time) as ITime);
    }
  }, []);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Box typography="body">
          {parse(labEndContent || 'Loading')}
        </Box>
      </Grid>
      <Grid item>
        <Box typography="body1">
          Time elapsed:
          <TimerDisplay
            hours={timeElapsed.hours}
            minutes={timeElapsed.minutes}
            seconds={timeElapsed.seconds}
          />
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
          <Button variant="outlined">Generate Report</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LabEnd;
