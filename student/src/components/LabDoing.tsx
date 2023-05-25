import React, { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';

interface LabProtocols {
  intro: string,
  questions: string[],
  outro: string,
}

function LabDoing(
  { currentLabId, handleSubmit }:
    { currentLabId: string, handleSubmit: () => void }) {
  const [content, setContent] = useState<LabProtocols>();

  useEffect(() => {
    console.log("Doing the Lab of ID: ", currentLabId);

    // Get from API
    const temp: LabProtocols = {
      intro: `Lab Doing page header`,
      questions: ["Question 1", "Question 2"],
      outro: 'Lab Doing page footer'
    }
    setContent(temp);
  }, [])

  // TODO: Refractor later
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        {content ? content.intro : "Loading"}
      </Grid>
      <Grid item>
        {content ? content.questions : "Loading"}
      </Grid>
      <Grid item>
        {content ? content.outro : "Loading"}
      </Grid>
      <Grid item>
        <Button variant='contained' onClick={handleSubmit}>Submit</Button>
      </Grid>
    </Grid>
  );
}

export default LabDoing;
