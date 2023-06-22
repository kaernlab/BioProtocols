import React from 'react';
import {
  Box, Divider, Grid, TextField,
} from '@mui/material';
import {
  Field, FieldProps, Form, Formik, FormikValues, ErrorMessage,
} from 'formik';
import {
  ContentState, EditorState, convertFromHTML, convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import * as yup from 'yup';
import { ILabData } from '../../utils/interfaces';
import {
  SaveButton, BackToDashboardButton, PreviewWYSIWYG, ResetButton,
} from '../Style/Styled';
import CustomFormikRichTextInput from '../Style/CustomFormikRichTextInput';

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
    handleWriteToDB: (labId: string, obj: ILabData) => void,
  },
) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const initialContent: ILabData = {
    title: data.title,
    labStartBody: data.labStartBody,
    labContent: {
      header: data.labContent.header,
      questions: data.labContent.questions,
      footer: data.labContent.footer,
    },
    labFinishedBody: data.labFinishedBody,
  };

  const convertToEditorState = (rawHTML: string) => {
    const blocksFromHTML = convertFromHTML(rawHTML);
    const { contentBlocks } = blocksFromHTML;
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    return EditorState.createWithContent(contentState);
  };

  return (
    <Formik
      initialValues={
        {
          title: data.title,
          labStartBody: convertToEditorState(data.labStartBody),
          labContent: {
            header: convertToEditorState(data.labContent.header),
            questions: [],
            footer: convertToEditorState(data.labContent.footer),
          },
          labFinishedBody: convertToEditorState(data.labFinishedBody),
        }
      }
      onSubmit={(values) => {
        const editedContent = {
          title: values.title,
          labStartBody: draftToHtml(convertToRaw(values.labStartBody.getCurrentContent())),
          labContent: {
            header: draftToHtml(convertToRaw(values.labContent.header.getCurrentContent())),
            questions: [],
            footer: draftToHtml(convertToRaw(values.labContent.footer.getCurrentContent())),
          },
          labFinishedBody: draftToHtml(convertToRaw(values.labFinishedBody.getCurrentContent())),
        };
        handleWriteToDB(labId, editedContent);
        console.log('save');
      }}
      validationSchema={yup.object().shape({
        title: yup.string().required('Title is required'),
      })}
    >
      {({
        values, dirty, handleSubmit, resetForm, isValid,
      }) => (
        <Form>
          <Grid container direction="column" spacing={3}>
            <Grid item container direction="column" spacing={1}>
              <Grid item container direction="column" spacing={2}>
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
                  <Field name="title">
                    {({ field }: FieldProps<FormikValues['title']>) => (
                      <TextField
                        required
                        sx={{ width: '500px' }}
                        label="Required"
                        name={field.name}
                        value={values.title}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                      />
                    )}
                  </Field>
                  <ErrorMessage name="title">
                    {(msg) => <div style={{ color: 'red' }}>{msg}</div>}
                  </ErrorMessage>
                </Grid>
              </Grid>
              <Grid item container spacing={2}>
                <Grid item>
                  <BackToDashboardButton onClick={handleGoHome} />
                </Grid>
                <Grid item>
                  <SaveButton disabled={!dirty || !isValid} onClick={handleSubmit} />
                </Grid>
                <Grid item>
                  <ResetButton disabled={!dirty} onClick={resetForm} />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item>
              <Grid item container direction="column">
                <Box typography="h6">
                  Edit Lab Start Page
                </Box>
                <CustomFormikRichTextInput name="labStartBody" />
              </Grid>
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
              <Grid item container spacing={3} direction="column">
                <Grid item>
                  <Box typography="subtitle2">
                    Edit Lab Content header
                  </Box>
                  <CustomFormikRichTextInput name="labContent.header" />
                </Grid>
                <Grid item>
                  <Box typography="subtitle2">
                    Edit Lab Content questions
                  </Box>
                </Grid>
                <Grid item>
                  <Box typography="subtitle2">
                    Edit Lab Content footer
                  </Box>
                  <CustomFormikRichTextInput name="labContent.footer" />
                </Grid>
                <Grid item>
                  <PreviewWYSIWYG previewContentRaw="Examples go here" />
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
              <CustomFormikRichTextInput name="labFinishedBody" />
            </Grid>
            <Grid item />
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

export default LabEdit;
