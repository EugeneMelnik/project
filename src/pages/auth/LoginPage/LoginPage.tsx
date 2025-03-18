import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Button, Link, Paper, TextField } from '@mui/material';
import RoutesApp from '../../../constants/routes';
import { useLanguage } from '../../../context/LanguageContext';
import { useStyles } from './LoginPage.styles';
import { loginThunk } from '../../../redux/actions/user-action';
import { useTypedDispatch } from '../../../redux';

export const LoginPage: FC = () => {
  const classes = useStyles();

  const dispatch = useTypedDispatch();

  const { language } = useLanguage();
  const { errors } = language.auth;

  const navigate = useNavigate();

  const validationSchema = yup.object({
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
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await dispatch(loginThunk(values));

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
          id="email"
          name="email"
          label={language.auth.email}
          autoFocus
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
        <Box className={classes.action}>
          <Button variant="contained" type="submit">
            {language.auth.login}
          </Button>
          <Link to={RoutesApp.SignUp} component={RouterLink}>
            {language.auth.signUp}
          </Link>
        </Box>
      </form>
    </Paper>
  );
};
