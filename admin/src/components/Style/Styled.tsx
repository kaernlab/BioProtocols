import {
  Accordion, AccordionDetails, AccordionSummary, Box, Button,
} from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';

function BackToDashboardButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} variant="outlined">
      { ' '}
      <ArrowBackIcon />
      Back to dashboard
    </Button>
  );
}

function SaveButton({ disabled, onClick } : { disabled: boolean, onClick: ()=> void }) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="contained"
    >
      <SaveIcon />
      Save
    </Button>
  );
}

function PreviewWYSIWYG({ previewContentRaw }: { previewContentRaw: string[] | string }) {
  return (
    <Accordion elevation={2}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Box typography="body">Raw</Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box typography="body">
          { typeof previewContentRaw === 'string' ? (
            <ReactMarkdown>
              {previewContentRaw}
            </ReactMarkdown>
          )
            : previewContentRaw.map((item) => (
              <ReactMarkdown key={item}>
                {item}
              </ReactMarkdown>
            ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export {
  BackToDashboardButton, SaveButton, PreviewWYSIWYG,
};
