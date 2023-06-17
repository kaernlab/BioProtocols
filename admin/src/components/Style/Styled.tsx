import {
  Accordion, AccordionDetails, AccordionSummary, Box, Button,
} from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
      type="submit"
    >
      <SaveIcon />
      Save
    </Button>
  );
}

function ResetButton({ disabled, onClick }: { disabled: boolean, onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="contained"
    >
      <RestartAltIcon />
      Reset
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
        <Box typography="body">Preview</Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box typography="body">
          { typeof previewContentRaw === 'string' ? (
            <div>
              {previewContentRaw}
            </div>
          )
            : previewContentRaw.map((rawItem) => (
              <div key={rawItem}>
                {rawItem}
              </div>
            ))}
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export {
  BackToDashboardButton, SaveButton, ResetButton, PreviewWYSIWYG,
};
