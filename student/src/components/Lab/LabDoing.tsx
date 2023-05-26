import React, { useEffect, useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { ILabProtocols } from '../../utils/interfaces';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

function LabDoing(
  { handleSubmit, labContent }:
    {
      handleSubmit: () => void,
      labContent: ILabProtocols,
    }) {
  const [content, setContent] = useState<ILabProtocols>();

  useEffect(() => {
    setContent(labContent as ILabProtocols);
  }, [])

  // TODO: Refractor later
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <ReactMarkdown>{content ? content.header : "Loading"}</ReactMarkdown>
      </Grid>
      <Grid item>
        {content ? content.questions.map((q) => {
          return (
            <Box typography="body" key={q}>
              <ReactMarkdown>
                {q}
              </ReactMarkdown>
            </Box>
          )
        }) : "Loading"}
      </Grid>
      <Grid item>
        <ReactMarkdown>{content ? content.footer : "Loading"}</ReactMarkdown>
      </Grid>
      <Grid item>
        <Button variant='contained' onClick={handleSubmit}>Submit</Button>
      </Grid>
    </Grid>
  );
}

export default LabDoing;
