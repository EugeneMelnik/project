import React, {
  FC,
  ReactElement,
  useState,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { createTheme } from '@mui/material';
import { breakpoints, Colors } from '../styles';

export const themeLight = createTheme({
  palette: {
    primary: {
      main: Colors.primary_main,
      light: Colors.primary_light,
      dark: Colors.primary_dark,
    },
    common: {
      white: Colors.gray,
      black: Colors.black,
    },
    secondary: {
      main: Colors.secondary_main,
    },
    background: {
      default: Colors.white,
    },
    error: {
      main: Colors.error,
    },
    warning: {
      main: Colors.warning,
    },
    text: {
      primary: Colors.black,
      secondary: Colors.primary_light,
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '::-webkit-scrollbar': {
          width: '0.3rem',
          height: '0.3rem',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: Colors.black,
        },
        ':root': {
          height: '100%',

          body: {
            height: '100%',
          },

          '#root': {
            height: '100%',
          },

          '.App': {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          },

          '.MuiPaper-root': {
            backgroundColor: Colors.white,
          },

          [breakpoints.up('md')]: {
            fontSize: '18px',
          },
          [breakpoints.down('md')]: {
            fontSize: '16px',
          },
          [breakpoints.down('xs')]: {
            fontSize: '14px',
          },
        },
      },
    },
  },
});

export const themeDark = createTheme({
  palette: {
    primary: {
      main: Colors.secondary_main,
      light: Colors.primary_dark,
      dark: Colors.primary_light,
    },
    common: {
      white: Colors.black,
      black: Colors.gray,
    },
    secondary: {
      main: Colors.secondary_main,
    },
    background: {
      default: Colors.black,
    },
    error: {
      main: Colors.error,
    },
    warning: {
      main: Colors.warning,
    },
    text: {
      primary: Colors.white,
      secondary: Colors.primary_light,
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '::-webkit-scrollbar': {
          width: '0.3rem',
          height: '0.3rem',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: Colors.black,
        },
        ':root': {
          height: '100%',

          body: {
            height: '100%',
          },

          '#root': {
            height: '100%',
          },

          '.App': {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          },

          '.MuiPaper-root': {
            backgroundColor: Colors.primary_light,
          },

          [breakpoints.up('md')]: {
            fontSize: '18px',
          },
          [breakpoints.down('md')]: {
            fontSize: '16px',
          },
          [breakpoints.down('xs')]: {
            fontSize: '14px',
          },
        },
      },
    },
  },
});

export const themes = {
  light: themeLight,
  dark: themeDark,
};

export type ThemeType = 'light' | 'dark';

interface ITheme {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

function setThemeValue(theme: ThemeType) {
  localStorage.setItem('theme', theme);
}

function getTheme() {
  return localStorage.getItem('theme') as ThemeType | null;
}

const ThemeContext = createContext<ITheme | null>(null);

export const ThemeContextProvider: FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeType>(getTheme() || 'light');

  const handleSetTheme = (theme: ThemeType) => {
    setTheme(theme);

    setThemeValue(theme);
  };

  if (!getTheme()) {
    handleSetTheme('light');
  }

  const themeProviderValue = useMemo(
    () => ({ theme, setTheme: handleSetTheme }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={themeProviderValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error('themeContext is not provided');
  }

  return themeContext;
};
