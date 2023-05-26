import React from 'react';
import {
  Box, Button, Card, CardActions, CardContent,
} from '@mui/material';


function ClickableLabCard(
  { id, title, onClick }:
    { id: string, title: string, onClick: () => void }) {

  return (
    <Card variant="outlined" sx={{ minWidth: 275 }} key={id}>
      <CardContent>
        <Box typography="body1">
          {' '}
          {title}
          {' '}
        </Box>
      </CardContent>
      <CardActions>
        <Button variant="text" onClick={onClick}> Select </Button>
      </CardActions>
    </Card>
  );
}

export default ClickableLabCard;
