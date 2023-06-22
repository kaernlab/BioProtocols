import React from 'react';
import {
  Skeleton, Stack, Typography,
} from '@mui/material';

function PageControllerLoading() {
  return (
    <Stack spacing={2}>
      <Typography component="div" key="h3" variant="h3">
        <Skeleton />
      </Typography>
      <Typography component="div" key="h6" variant="h6">
        <Skeleton />
      </Typography>
      <Skeleton variant="rectangular" height={120} />
      <Skeleton variant="rectangular" height={120} />
    </Stack>
  );
}

export default PageControllerLoading;
