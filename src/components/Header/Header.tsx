import React, { FC } from 'react';
import { Box, Link, Toolbar } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../Logo/Logo';
import RoutesApp from '../../constants/routes';
import { Toggle } from '../Toggle/Toggle';
import { StyledAppBar } from './Header.styles';
import { accessTokenSelector } from '../../redux/selectors/share-selector';
import { useTypedSelector } from '../../redux';
import { LanguageEnum, useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

export const Header: FC = () => {
  const accessToken = useTypedSelector(accessTokenSelector);

  const {
    setLanguage,
    language: { mode, auth },
  } = useLanguage();
  const { setTheme, theme } = useTheme();

  const handleChangeLanguage = () => {
    if (mode === LanguageEnum.eng) {
      setLanguage(LanguageEnum.by);
      return;
    }

    setLanguage(LanguageEnum.eng);
  };

  const handleChangeTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
      return;
    }

    setTheme('dark');
  };

  return (
    <StyledAppBar>
      <Toolbar
        sx={{
          justifyContent: 'space-around',
          columnGap: '2rem',
          minWidth: '600px',
        }}
      >
        {accessToken ? (
          <Logo />
        ) : (
          <Link component={RouterLink} to={RoutesApp.Login}>
            {auth.login}
          </Link>
        )}
        <Toggle
          setValue={handleChangeTheme}
          value={theme}
          initialValue={'dark'}
        />
        <Toggle
          setValue={handleChangeLanguage}
          value={mode}
          initialValue={LanguageEnum.eng}
        />
        <Box sx={{ flexGrow: '2rem' }} />
      </Toolbar>
    </StyledAppBar>
  );
};
