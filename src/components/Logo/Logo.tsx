import React, { FC } from 'react';
import { Avatar, Stack } from '@mui/material';
import { useNavigate } from 'react-router';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RoutesApp from '../../constants/routes';
import {
  userNameSelector,
  userRoleSelector,
  userSurnameSelector,
} from '../../redux/selectors/user-selector';
import { RolesEnum } from '../../types';
import { StyledChip } from './Logo.styles';
import { useTypedSelector } from '../../redux';

const Logo: FC = () => {
  const name = useTypedSelector(userNameSelector);
  const surname = useTypedSelector(userSurnameSelector);
  const role = useTypedSelector(userRoleSelector);

  const navigate = useNavigate();

  function handleClickNavigateToAdminPage() {
    if (role === RolesEnum.User) return;

    navigate(RoutesApp.Admin);
  }

  return (
    <Stack direction="row">
      <StyledChip
        avatar={
          <Avatar
            style={{
              position: 'absolute',
              left: 0,
              height: '3rem',
              width: '3rem',
              marginLeft: 0,
            }}
          >
            {role === RolesEnum.Admin && <RadioButtonCheckedIcon />}
          </Avatar>
        }
        label={`${name} ${surname}`}
        clickable={role === RolesEnum.Admin}
        onClick={handleClickNavigateToAdminPage}
      />
    </Stack>
  );
};

export default Logo;
