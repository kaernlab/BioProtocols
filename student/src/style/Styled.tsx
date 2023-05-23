import { Box, Button, Card, CardActions, CardContent } from '@mui/material';
import React from 'react';

function ClickableLabCard({ title, onClick }: { title?: string, onClick: null }) {
  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Box typography="body1"> {title} </Box>
      </CardContent>
      <CardActions>
        <Button variant="text"> Select </Button>
      </CardActions>
    </Card>
  )
}

export { ClickableLabCard }