import {
  Box, Button, Card, CardActions, CardContent, Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { ILab, ILabData } from '../../utils/interfaces';

function Dashboard(
  {
    handleSelectLab,
    handleCreateNewLab,
    data,
  }:
  {
    handleSelectLab: (labId: string) => void,
    handleCreateNewLab: () => void,
    data: Record<string, ILabData>,
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

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <Box typography="h5">
          Dashboard
        </Box>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={handleCreateNewLab}
        >
          <AddIcon />
          {' '}
          Create new lab
        </Button>
      </Grid>
      <Grid item container direction="column" spacing={2}>
        {labList.map((lab) => (
          <Grid
            item
            key={lab.id}
          >
            <Card variant="outlined" sx={{ minWidth: 275 }} key={lab.id}>
              <CardContent>
                <Box typography="body1">
                  {lab.title}
                </Box>
              </CardContent>
              <CardActions>
                <Button variant="outlined" onClick={() => handleSelectLab(lab.id)}>
                  {' '}
                  <EditIcon />
                  Edit
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default Dashboard;
