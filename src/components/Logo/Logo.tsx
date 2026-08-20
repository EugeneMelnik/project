import React, { FC } from 'react';
import { Avatar, Chip, Stack } from '@mui/material';
import { useNavigate } from 'react-router';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RoutesApp from '../../constants/routes';

interface ILogo {
  name: string;
  surname: string;
  role: 'Admin' | 'User';
}

const Logo: FC<ILogo> = ({ name, surname, role }) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(RoutesApp.Admin);
  }

  return (
    <Stack direction="row">
      <Chip
        sx={(theme) => ({
          position: 'relative',
          fontSize: '1.2rem',
          paddingLeft: '3rem',
          height: '2.8rem',
          borderRadius: '3rem',
          minWidth: '3rem',

          '& .MuiChip-label': {
            [theme.breakpoints.down('md')]: {
              display: 'none',
            },
          },
        })}
        avatar={(
          <Avatar
            style={{
              position: 'absolute',
              left: 0,
              height: '3rem',
              width: '3rem',
              marginLeft: 0,
            }}
          >
            {role === 'Admin' ? <RadioButtonCheckedIcon /> : null}
          </Avatar>
        )}
        label={`${name} ${surname}`}
        clickable={role === 'Admin'}
        onClick={() => {
          if (role === 'User') return;
          handleClick();
        }}
      />
    </Stack>
  );
};

export default Logo;
