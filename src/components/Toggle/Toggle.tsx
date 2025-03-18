import React, { FC } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import { MaterialUISwitch } from './Toggle.styles';
import { IToggle } from './type';
import { FormGroup } from '@mui/material';

export const Toggle: FC<IToggle> = ({ setValue, value, initialValue }) => (
  <FormGroup sx={{ width: 30 }}>
    <FormControlLabel
      sx={{
        '& .MuiFormControlLabel-label': {
          color: (theme) => theme.palette.common.black,
        },
      }}
      color="primary"
      control={
        <MaterialUISwitch
          onChange={setValue}
          checked={value === initialValue}
        />
      }
      label={value}
    />
  </FormGroup>
);
