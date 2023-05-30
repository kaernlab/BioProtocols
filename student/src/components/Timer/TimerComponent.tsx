import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid } from '@mui/material';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import TimerDisplay from './TimerDisplay';
import { ITime } from '../../utils/interfaces';

function TimerComponent() {
  const storedTime = localStorage.getItem('elapsedTime');
  const [time, setTime] = useState<ITime>(
    storedTime
      ? (JSON.parse(storedTime) as ITime)
      : { hours: 0, minutes: 0, seconds: 0 },
  );

  useEffect(() => {
    let updatedTime: ITime = time;

    const timerId = setInterval(() => {
      setTime((prevTime) => {
        const seconds = prevTime.seconds + 1;
        const minutes = prevTime.minutes + Math.floor(seconds / 60);
        const hours = prevTime.hours + Math.floor(minutes / 60);
        updatedTime = {
          hours,
          minutes: minutes % 60,
          seconds: seconds % 60,
        };

        return updatedTime;
      });
    }, 1000);

    // On component unmount
    return () => {
      clearInterval(timerId);
      localStorage.setItem('elapsedTime', JSON.stringify(updatedTime));
    };
  }, []);

  return (
    <Card sx={{ minWidth: 150, maxHeight: '50px' }} elevation={0}>
      <CardContent>
        <Grid container spacing={0.5} direction="row" display="flex">
          <Grid item>
            <AvTimerIcon />
          </Grid>
          <Grid item>
            <TimerDisplay
              hours={time.hours}
              minutes={time.minutes}
              seconds={time.seconds}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default TimerComponent;
