import React, { useState, useEffect } from 'react';
import { Card, Box, CardContent } from '@mui/material';

// TODO: Make this more efficient!!
// Write now we're writing to localstorage every second (this is bad)
const TimerComponent = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(prevTime => {
        const seconds = prevTime.seconds + 1;
        const minutes = prevTime.minutes + Math.floor(seconds / 60);
        const hours = prevTime.hours + Math.floor(minutes / 60);
        const updatedTime = {
          hours: hours,
          minutes: minutes % 60,
          seconds: seconds % 60
        };
        localStorage.setItem('elapsedTime', JSON.stringify(updatedTime));
        return updatedTime;
      });
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);


  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Box typography="body1">
          Time elapsed: {time.hours}:{time.minutes}:{time.seconds}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TimerComponent;
