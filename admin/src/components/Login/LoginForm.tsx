/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Formik, Form, Field, FieldInputProps, FormikHelpers, ErrorMessage,
} from 'formik';
import {
  Box,
  Button,
  Grid,
  TextField,
} from '@mui/material';
import * as yup from 'yup';
import { FormValues } from '../../utils/interfaces';

function LoginForm(
  { handleLogin }:
  {
    handleLogin: (values: FormValues) => Promise<void>;
  },
) {
  const handleSubmit = async (
    values: FormValues,
    { resetForm, setSubmitting, setErrors }: FormikHelpers<FormValues>,
  ) => {
    setSubmitting(true);
    try {
      await handleLogin(values); // Wait for the login to complete
      setSubmitting(false);
      resetForm();
    } catch (e) {
      if (e instanceof Error) {
        setSubmitting(false);
        setErrors({ generalError: e.message });
      } else {
        setErrors({ generalError: 'Some unknown error happened' });
      }
    }
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required'),
    password: yup
      .string()
      .required('Password is required'),
  });

  return (
    <Formik
      initialValues={{ username: '', password: '', generalError: '' }}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({
        touched, errors, isValid, isSubmitting, dirty,
      }) => (
        <Form>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <Box typography="h5">
                Please log in
              </Box>
            </Grid>
            <Grid item>
              <Field name="username">
                {({ field }: { field: FieldInputProps<any> }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    autoComplete="off"
                    variant="outlined"
                    label="Login"
                    placeholder="john123"
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                )}
              </Field>
            </Grid>
            <Grid item>
              <Field name="password">
                {({ field }: { field: FieldInputProps<any> }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    autoComplete="off"
                    variant="outlined"
                    label="Password"
                    placeholder="password123"
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                )}
              </Field>
            </Grid>
            <Grid item>
              <Button
                disabled={!isValid || isSubmitting || !dirty}
                type="submit"
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            </Grid>
            <Grid item>
              <ErrorMessage name="generalError">
                {(msg) => (msg ? (
                  <Box typography="body1" style={{ color: 'red' }}>
                    {msg}
                  </Box>
                ) : (
                  <Box height={16} />
                ))}
              </ErrorMessage>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
export default LoginForm;
