import React, { FC, useCallback, useEffect, useState } from 'react';
import { Button, Card, CardContent, Stack, Typography } from '@mui/material';
import { requestAPI } from '../../api/api';

type User = { id: string; name: string; surname: string; role: string; status: string };

export const AdminPage: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const loadUsers = useCallback(async () => { setUsers(await requestAPI.getAllUsers()); }, []);
  useEffect(() => { loadUsers(); }, [loadUsers]);
  async function changeUser(id: string, action: 'block' | 'unblock' | 'admin' | 'user') { await requestAPI.updateUser(id, action); await loadUsers(); }
  return <Stack spacing={2} sx={{ py: { xs: 2, md: 5 } }}><Typography variant="h3">Administration</Typography>{users.map((user) => <Card key={user.id} variant="outlined"><CardContent><Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems="center"><Typography sx={{ flex: 1 }}>{user.name} {user.surname} · {user.role} · {user.status}</Typography><Button onClick={() => changeUser(user.id, user.status === 'blocked' ? 'unblock' : 'block')}>{user.status === 'blocked' ? 'Unblock' : 'Block'}</Button><Button onClick={() => changeUser(user.id, user.role === 'Admin' ? 'user' : 'admin')}>{user.role === 'Admin' ? 'Remove admin' : 'Make admin'}</Button></Stack></CardContent></Card>)}</Stack>;
};
