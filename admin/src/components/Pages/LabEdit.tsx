import { Box, Divider, Grid } from '@mui/material';
import React, { useState } from 'react';
import { EditableContent, ILabData } from '../../utils/interfaces';
import { SaveButton, BackToDashboardButton, PreviewWYSIWYG } from '../Style/Styled';
import HTMLEditor from '../Editor/HTMLEditor';

// Hooks version of the Class below (done by me)

function LabEdit(
  {
    data,
    labId,
    handleGoHome,
    handleWriteToDB,
  }:{
    data: ILabData,
    labId: string,
    handleGoHome: () => void,
    handleWriteToDB: (obj: EditableContent) => void,
  },
) {
  const [edited, setEdited] = useState(false);

  const originalContent: EditableContent = {
    title: data.title,
    startBody: data.labStartBody,
    content: {
      header: data.labContent.header,
      questions: data.labContent.questions,
      footer: data.labContent.footer,
    },
    finishedBody: data.labFinishedBody,
  };

  const [editableContent, setEditableContent] = useState<EditableContent>(originalContent);

  const handleSave = () => {
    // TODO: Put Set  edited somewhere
    setEdited(true);
    console.log('Original', originalContent);
    console.log(editableContent);
    handleWriteToDB(editableContent);
    console.log('save');
  };

  const handleChange = (key: string, value: string) => {
    setEditableContent((prevContent) => ({
      ...prevContent,
      [key]: value,
    }));
  };

  return (
    <Grid container direction="column" spacing={3}>
      <Grid item container direction="column" spacing={1}>
        <Grid item container direction="column" spacing={1}>
          <Grid item>
            <Box typography="body" sx={{ color: 'red' }}>
              Editing:
            </Box>
          </Grid>
          <Grid item>
            <Box typography="body">
              Lab ID (cannot be changed):
              {' '}
              {labId}
            </Box>
          </Grid>
          <Grid item>
            <Box typography="h5">
              {data.title}
            </Box>
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item>
            <BackToDashboardButton onClick={handleGoHome} />
          </Grid>
          <Grid item>
            <SaveButton disabled={!edited} onClick={handleSave} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      <Grid item>
        <Box typography="h6">
          Edit Lab Start Body
        </Box>
        <HTMLEditor k="startBody" handleChange={handleChange} value={data.labStartBody} />
        <PreviewWYSIWYG previewContentRaw={editableContent.startBody} />
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      <Grid item container>
        <Grid item>
          <Box typography="h6">
            Edit Lab Content
          </Box>
        </Grid>
        <Grid item container spacing={2}>
          <Grid item>
            <Box typography="subtitle2">
              Edit Lab Content header
            </Box>
            <PreviewWYSIWYG previewContentRaw={data.labContent.header} />
          </Grid>
          <Grid item>
            <Box typography="subtitle2">
              Edit Lab Content questions
            </Box>
            <PreviewWYSIWYG previewContentRaw={data.labContent.questions} />
          </Grid>
          <Grid item>
            <Box typography="subtitle2">
              Edit Lab Content footer
            </Box>
            <PreviewWYSIWYG previewContentRaw={data.labContent.footer} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
      <Grid item>
        <Box typography="h6">
          Lab Finished Body
        </Box>
        <PreviewWYSIWYG previewContentRaw={data.labFinishedBody} />
      </Grid>
      <Grid item />
    </Grid>
  );
}

export default LabEdit;
