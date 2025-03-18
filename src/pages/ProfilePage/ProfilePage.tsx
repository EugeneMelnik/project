import React, { FC } from 'react';
import { Avatar, Chip, Paper, Stack, Typography } from '@mui/material';
import { useTypedSelector } from '../../redux';
import {
  getUserEmail,
  getUserStatus,
  userNameSelector,
  userRoleSelector,
  userSurnameSelector,
} from '../../redux/selectors/user-selector';
import { useLanguage } from '../../context/LanguageContext';

export const ProfilePage: FC = () => {
  const { language } = useLanguage();
  const name = useTypedSelector(userNameSelector) || '';
  const surname = useTypedSelector(userSurnameSelector) || '';
  const email = useTypedSelector(getUserEmail) || '';
  const role = useTypedSelector(userRoleSelector) || '';
  const status = useTypedSelector(getUserStatus) || '';

  return (
    <Stack spacing={3} sx={{ py: { xs: 2, md: 5 }, maxWidth: 720 }}>
      <Typography variant="h3" sx={{ fontWeight: 800 }}>{language.common.profile}</Typography>
      <Paper sx={{ p: { xs: 3, md: 5 } }}>
        <Stack spacing={2} alignItems="flex-start">
          <Avatar sx={{ width: 72, height: 72, fontSize: '2rem' }}>{name.charAt(0).toUpperCase()}</Avatar>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>{name} {surname}</Typography>
          <Typography><strong>{language.common.email}:</strong> {email}</Typography>
          <Stack direction="row" spacing={1}>
            <Chip label={`${language.common.role}: ${role}`} />
            <Chip color="success" label={`${language.common.status}: ${status}`} />
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
};
