import React, { useEffect, useState, ChangeEvent } from 'react';
import { Box, Button, Grid, Checkbox } from '@mui/material';
import { ILabProtocols } from '../../utils/interfaces';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { isFirstCharANumber } from '../../utils/functions';
import TimerComponent from '../Timer/TimerComponent';

function LabDoing(
  {
    handleSubmit,
    labContent
  }:
    {
      handleSubmit: () => void,
      labContent: ILabProtocols,
    }) {
  const [content, setContent] = useState<ILabProtocols>();
  const [checkedCount, setCheckedCount] = useState(0);
  const [submittable, setSubmittable] = useState(false);
  let checkboxRenderCount = 0;

  useEffect(() => {
    setContent(labContent as ILabProtocols);
  }, [])

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const increment = isChecked ? 1 : -1;
    setCheckedCount(checkedCount + increment);
    if (checkedCount + increment === checkboxRenderCount) {
      setSubmittable(true);
    } else {
      setSubmittable(false);
    }
  };

  const renderCheckbox = (q: string) => {
    if (isFirstCharANumber(q)) {
      checkboxRenderCount++; // Increment checkbox render count
      return (
        <Grid item key={q} container>
          <Grid item xs={0.5}>
            <Checkbox onChange={handleCheckboxChange} />
          </Grid>
          <Grid item xs={10}>
            <Box typography="body">
              <ReactMarkdown>{q}</ReactMarkdown>
            </Box>
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid item key={q} container>
          <Grid item xs={10}>
            <Box typography="body">
              <ReactMarkdown>{q}</ReactMarkdown>
            </Box>
          </Grid>
        </Grid>
      )
    }
    return null;
  };

  // TODO: Refractor later to change ReactMarkdown fonts to MUI fonts
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item container>
        <ReactMarkdown>{content ? content.header : "Loading"}</ReactMarkdown>
        <TimerComponent />
      </Grid>
      <Grid item container spacing={1} direction="column">
        {content ? content.questions.map((q) => renderCheckbox(q)) : "Loading"}
      </Grid>
      <Grid item>
        <ReactMarkdown>{content ? content.footer : "Loading"}</ReactMarkdown>
      </Grid>
      <Grid item container flexDirection="row" alignItems="center" spacing={2}>
        <Grid item>
          <Button variant='contained' onClick={handleSubmit} disabled={!submittable}>Submit</Button>
        </Grid>
        <Grid item>
          <Box typography="body1">
            Progress = {checkedCount} / {checkboxRenderCount}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LabDoing;
