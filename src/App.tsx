import React, { FC, useEffect } from 'react';
import 'firebase/compat/auth';
import {
  Backdrop,
  CircularProgress,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import Toastify from './components/Toastify/Toastify';
import { AppRoutes } from './routes';
import { useTheme, themes } from './context/ThemeContext';
import { isLoadingSelector } from './redux/selectors/share-selector';
import { useTypedSelector } from './redux';
import { restoreAuthThunk } from './redux/actions/user-action';
import { useTypedDispatch } from './redux';

const App: FC = () => {
  const { theme } = useTheme();
  const dispatch = useTypedDispatch();

  const isLoading = useTypedSelector(isLoadingSelector);

  useEffect(() => {
    dispatch(restoreAuthThunk());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Backdrop open={isLoading}>
        <CircularProgress color="warning" />
      </Backdrop>
    );
  }

  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <div className="App">
        <AppRoutes />
        <Toastify />
      </div>
    </ThemeProvider>
  );
};

export default App;
