import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box, Button, IconButton, Link, Paper, TextField,
} from '@mui/material';
import { makeStyles } from '@material-ui/core';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import RoutesApp from '../../constants/routes';
import login from '../services/login';
import { signInWithGoogle, signInWithFacebook } from '../firebase-config';
import { logError } from '../../services/logger';
import { useLanguage } from '../../context/LanguageContext';

interface ILoginPage {
  id: string;
  loginUser: (userId: string) => void;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1.4rem',
    top: '50%',
    left: '50%',
    width: '500px',
    transform: 'translate(-50%, -50%)',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
    maxWidth: '500px',
    width: '100%',
  },
  link: {
    position: 'relative',
    zIndex: 2,
  },
  action: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .trim()
    .required('Email is required'),
  password: yup
    .string()
    .min(2, 'Password should be of minimum 2 characters length')
    .trim()
    .required('Password is required'),
});

const LoginPage: FC<ILoginPage> = ({ id, loginUser }) => {
  const classes = useStyles();

  const { language } = useLanguage();

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await login(values.email, values.password);

        loginUser(id);

        navigate(RoutesApp.User);

        resetForm({ values: { email: '', password: '' } });
      } catch (error: any) {
        logError(error.message);
      }
    },
  });

  async function handleLoginGoogle() {
    try {
      await signInWithGoogle();

      navigate(RoutesApp.User);
    } catch (error: any) {
      logError(error.message);
    }
  }

  async function handleLoginFacebook() {
    try {
      await signInWithFacebook();

      navigate(RoutesApp.User);
    } catch (error: any) {
      logError(error.message);
    }
  }

  return (
    <Paper className={classes.paper}>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <Link
          className={classes.link}
          component={RouterLink}
          to={RoutesApp.Root}
        >
          App
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
          <IconButton onClick={handleLoginFacebook}>
            <FacebookIcon
              sx={{
                color: '#4267B2',
                fontSize: '2rem',
              }}
            />
          </IconButton>
          <IconButton onClick={handleLoginGoogle}>
            <GoogleIcon />
          </IconButton>
          <Link to={RoutesApp.SignUp} component={RouterLink}>
            {language.auth.signUp}
          </Link>
        </Box>
      </form>
    </Paper>
  );
};

export default LoginPage;
