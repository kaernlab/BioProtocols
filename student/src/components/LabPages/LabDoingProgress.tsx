/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import {
  Box, Button, Grid, LinearProgress, LinearProgressProps, Paper, Typography,
} from '@mui/material';
import React from 'react';
import TimerComponent from '../Timer/TimerComponent';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(
            props.value,
          )}%`}

        </Typography>
      </Box>
    </Box>
  );
}

function LabDoingProgress({
  handleSubmit,
  isDisabled,
  progressVal,
}:{
  handleSubmit: () => void,
  isDisabled: boolean,
  progressVal: number
}) {
  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
      }}
      elevation={3}
    >
      <Grid container>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isDisabled}
        >
          Submit
        </Button>
        <TimerComponent />
      </Grid>
      <Grid item>
        <Box sx={{ width: '100%' }}>
          <LinearProgressWithLabel
            variant="determinate"
            value={progressVal}
          />
        </Box>
      </Grid>
    </Paper>
  );
}

export default LabDoingProgress;
