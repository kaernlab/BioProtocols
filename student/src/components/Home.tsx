import React, { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import ClickableLabCard from '../utils/Styled';
import { ILabData, ILab } from '../utils/interfaces';

function Home(
  {
    data,
    handleSelectLab,
  }:
  {
    data: Record<string, ILabData>,
    handleSelectLab: (selectedLabId: string) => void
  },
) {
  const [labList, setLabList] = useState<ILab[]>([]);

  useEffect(() => {
    const exerciseKeys = Object.keys(data);
    const temp = exerciseKeys.map((key) => ({
      id: key,
      title: data[key].title,
    }));
    setLabList(temp);
  }, []);

  function handleLabCardClick(labId: string) {
    handleSelectLab(labId);
  }

  return (
    <Grid container spacing={2} direction="column">
      <Grid item xs={12}>
        <Box typography="h5"> Select lab:</Box>
      </Grid>
      <Grid item container spacing={2} flexDirection="column">
        {labList.map((lab) => (
          <Grid
            item
            key={lab.id}
          >
            <ClickableLabCard
              id={lab.id}
              title={lab.title}
              onClick={() => handleLabCardClick(lab.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default Home;
