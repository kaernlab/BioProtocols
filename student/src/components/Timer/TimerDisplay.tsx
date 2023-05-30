import React from 'react';
import { Box } from '@mui/material';

function TimerDisplay({
  hours,
  minutes,
  seconds,
}:{
  hours: number,
  minutes: number,
  seconds: number,
}) {
  return (
    <Box typography="body1">
      {' '}
      {hours}
      :
      {minutes >= 10 ? minutes : `0${minutes}`}
      :
      {seconds >= 10 ? seconds : `0${seconds}`}
    </Box>
  );
}

export default TimerDisplay;
