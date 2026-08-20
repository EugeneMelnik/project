import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import 'firebase/compat/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
  Backdrop, CircularProgress, ThemeProvider, CssBaseline,
} from '@mui/material';
import {
  CredentialsType,
  getUserPersonalInfoThunk,
  toggleLikeThunk,
} from './redux/actions/user-action';
import { AppStateType } from './redux';
import { setIsAuthAction } from './redux/actions/auth-action';
import Toastify from './components/Toastify/Toastify';
import AppRoutes from './routes';
import { useTheme, themes } from './context/ThemeContext';

interface IRootPage {
  getUserPersonalInfo: (payload: CredentialsType) => void;
  toggleLike: (userId: number, itemId: number) => void;
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
}
const App: FC<IRootPage> = ({
  getUserPersonalInfo,
  toggleLike,
  isAuth,
  setIsAuth,
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        if (displayName && email) {
          const [name, surname] = displayName.split(' ');

          getUserPersonalInfo({
            id: uid,
            name,
            surname,
            email,
          });
        }
      } else {
        setIsAuth(true);
      }
    });
  }, []);

  if (!isAuth) {
    return (
      <Backdrop open={!isAuth}>
        <CircularProgress color="warning" />
      </Backdrop>
    );
  }

  return (
    <ThemeProvider theme={themes[theme]}>
      <CssBaseline />
      <div className="App">
        <AppRoutes toggleLike={toggleLike} />
        <Toastify />
      </div>
    </ThemeProvider>
  );
};
const mapStateToProps = (state: AppStateType) => ({
  isAuth: state.auth.isAuth,
});

const mapDispatchToProps = (dispatch: any) => ({
  getUserPersonalInfo: (payload: CredentialsType) => dispatch(getUserPersonalInfoThunk(payload)),
  toggleLike: (userId: number, itemId: number) => dispatch(toggleLikeThunk(userId, itemId)),
  setIsAuth: (isAuth: boolean) => dispatch(setIsAuthAction(isAuth)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
