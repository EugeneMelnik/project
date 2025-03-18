import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Link, Paper, TextField } from '@mui/material';

import RoutesApp from '../../../constants/routes';
import { useLanguage } from '../../../context/LanguageContext';
import { useStyles } from './SignUpPage.styles';
import { useTypedDispatch } from '../../../redux';
import { signUpThunk } from '../../../redux/actions/user-action';

export const SignUpPage: FC = () => {
  const classes = useStyles();

  const navigate = useNavigate();

  const dispatch = useTypedDispatch();

  const { language } = useLanguage();
  const { errors } = language.auth;

  const validationSchema = yup.object({
    name: yup
      .string()
      .trim()
      .min(2, errors.nameMin)
      .max(30, errors.nameMax)
      .required(errors.nameRequired),
    surname: yup
      .string()
      .trim()
      .min(2, errors.surnameMin)
      .max(30, errors.surnameMax)
      .required(errors.surnameRequired),
    email: yup
      .string()
      .email(errors.validEmail)
      .trim()
      .required(errors.emailRequired),
    password: yup
      .string()
      .min(2, errors.passwordMin)
      .trim()
      .required(errors.passwordRequired),
    confirm: yup
      .string()
      .required(errors.confirmRequired)
      .trim()
      .oneOf([yup.ref('password')], errors.passwordMatch),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirm: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await dispatch(signUpThunk(values));

      navigate(RoutesApp.Profile);

      resetForm();
    },
  });

  return (
    <Paper className={classes.paper}>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <Link
          className={classes.link}
          component={RouterLink}
          to={RoutesApp.Root}
        >
          {language.common.appName}
        </Link>
        <TextField
          fullWidth
          id="name"
          name="name"
          label={language.auth.name}
          autoFocus
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="surname"
          name="surname"
          label={language.auth.surname}
          value={formik.values.surname}
          onChange={formik.handleChange}
          error={formik.touched.surname && Boolean(formik.errors.surname)}
          helperText={formik.touched.surname && formik.errors.surname}
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          label={language.auth.email}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label={language.auth.password}
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          fullWidth
          id="confirm"
          name="confirm"
          label={language.auth.confirmPassword}
          type="password"
          value={formik.values.confirm}
          onChange={formik.handleChange}
          error={formik.touched.confirm && Boolean(formik.errors.confirm)}
          helperText={formik.touched.confirm && formik.errors.confirm}
        />
        <Box className={classes.action}>
          <Button variant="contained" type="submit">
            {language.auth.signUp}
          </Button>
          <Link component={RouterLink} to={RoutesApp.Login}>
            {language.auth.login}
          </Link>
        </Box>
      </form>
    </Paper>
  );
};
