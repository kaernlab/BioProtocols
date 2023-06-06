import React, { useEffect, useState, ChangeEvent } from 'react';
import { Box, Grid, Checkbox } from '@mui/material';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { ILabProtocols } from '../../utils/interfaces';
import isFirstCharANumber from '../../utils/functions';
import LabDoingProgress from './LabDoingProgress';

function LabDoing(
  {
    handleSubmit,
    labContent,
  }:
  {
    handleSubmit: () => void,
    labContent: ILabProtocols
  },
) {
  const [content, setContent] = useState<ILabProtocols>();
  const [checkedCount, setCheckedCount] = useState(0);
  const [submittable, setSubmittable] = useState(false);
  let checkboxRenderCount = 0;

  useEffect(() => {
    setContent(labContent as ILabProtocols);
  }, [labContent]);

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
      checkboxRenderCount += 1; // Increment checkbox render count
      return (
        <Grid item key={q} container>
          <Grid item xs={1}>
            <Checkbox onChange={handleCheckboxChange} />
          </Grid>
          <Grid item xs={11}>
            <Box typography="body">
              <ReactMarkdown>{q}</ReactMarkdown>
            </Box>
          </Grid>
        </Grid>
      );
    }
    return (
      <Grid item key={q} container>
        <Grid item xs={10}>
          <Box typography="body">
            <ReactMarkdown>{q}</ReactMarkdown>
          </Box>
        </Grid>
      </Grid>
    );
  };

  // TODO: Make timer persist with refresh
  return (
    <Box sx={{ pb: 7 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item container>
          <ReactMarkdown>
            {content?.header || 'Loading'}
          </ReactMarkdown>
        </Grid>
        <Grid item container spacing={1} direction="column">
          {content
            ? content.questions.map((q) => renderCheckbox(q))
            : <Grid item>Loading</Grid>}
        </Grid>
        <Grid item>
          <ReactMarkdown>
            {content ? content.footer : 'Loading'}
          </ReactMarkdown>
        </Grid>
      </Grid>
      <LabDoingProgress
        handleSubmit={handleSubmit}
        isDisabled={!submittable}
        progressVal={(checkedCount / checkboxRenderCount) * 100}
      />
    </Box>
  );
}

export default LabDoing;
