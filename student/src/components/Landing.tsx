import React from 'react';
import { Box, Grid } from '@mui/material';
import { ClickableLabCard } from '../style/Styled';

function Landing() {
  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
        <Box typography="h5"> Select lab:</Box>
      </Grid>
      <Grid item xs={12}>
        <ClickableLabCard title="Exercise #10: Bacterial Transformations" onClick={null} />
        <ClickableLabCard title="Exercise #11" onClick={null} />
      </Grid >
    </Grid>
  )
}

export default Landing;