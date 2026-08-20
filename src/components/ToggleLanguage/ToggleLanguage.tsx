/* eslint-disable max-len */
import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useLanguage } from '../../context/LanguageContext';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

const ToggleLanguage: FC<any> = () => {
  const { setLanguage, language } = useLanguage();

  return (
    <FormGroup>
      <FormControlLabel
        sx={{
          '& .MuiFormControlLabel-label': {
            color: (theme) => theme.palette.common.black,
          },
        }}
        color="primary"
        control={(
          <MaterialUISwitch
            sx={{ m: 1 }}
            onChange={() => {
              if (language.mode === 'eng') {
                setLanguage('by');
                return;
              }

              setLanguage('eng');
            }}
            checked={language.mode === 'by'}
          />
            )}
        label={language.mode}
      />
    </FormGroup>
  );
};

export default ToggleLanguage;
