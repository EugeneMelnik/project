import React, { FC, useEffect, useState } from 'react';
import { Alert, Card, CardContent, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { requestAPI } from '../../api/api';

type User = { id: string; name: string; surname: string; email: string; role: string; status: string; collections?: { id: number; title: string }[] };

export const UserPage: FC = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!userId) return;
    requestAPI.getTargetUser(userId).then(setUser).catch(() => setError('Unable to load user'));
  }, [userId]);
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!user) return <Typography sx={{ py: 5 }}>Loading...</Typography>;
  return <Stack spacing={2} sx={{ py: { xs: 2, md: 5 } }}><Typography variant="h3">{user.name} {user.surname}</Typography><Typography>{user.email}</Typography>{user.collections?.map((collection) => <Card key={collection.id} variant="outlined"><CardContent><Typography>{collection.title}</Typography></CardContent></Card>)}</Stack>;
};
