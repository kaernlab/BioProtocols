import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import ClickableLabCard from '../style/Styled';

type Lab = {
  id: string;
  title: string;
  content: string; // Use QuizContent type later
};

function Home(
  { handleSelectLab }:
    { handleSelectLab: (selectedLabId: string) => void },
) {
  const [labList, setLabList] = useState<Lab[]>([]);

  useEffect(() => {
    // Call API here to populate lab sdata
    const obj: Lab[] = [
      {
        id: 'exercise10',
        title: 'Exercise #10: Bacterial Transformations',
        content: 'other',
      },
      {
        id: 'exercise11',
        title: 'Exercise #11: Something else',
        content: 'other',
      },
    ];
    setLabList(obj);
  }, []);

  function handleLabCardClick(labId: string) {
    handleSelectLab(labId);
  }

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item xs={12}>
        <Box typography='h5'> Select lab:</Box>
      </Grid>
      <Grid item xs={12}>
        {labList.map(lab => (
          <ClickableLabCard
            key={lab.id}
            id={lab.id}
            title={lab.title}
            onClick={() => handleLabCardClick(lab.id)}
          />
        ))}
      </Grid>
    </Grid>
  );
}

export default Home;
