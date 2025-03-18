import React, { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import { Alert, Button, Paper, Stack, TextField, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useParams } from 'react-router-dom';
import { requestAPI } from '../../api/api';
import { useTypedSelector } from '../../redux';
import { userIdSelector } from '../../redux/selectors/user-selector';

type Item = { id: number; title: string; collection?: { title: string }; comments?: { id: number; content: string }[] };

export const ItemPage: FC = () => {
  const { itemId } = useParams();
  const userId = useTypedSelector(userIdSelector);
  const [item, setItem] = useState<Item | null>(null);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  const loadItem = useCallback(async () => {
    if (!itemId) return;
    try { setItem(await requestAPI.getItem(Number(itemId))); } catch { setError('Unable to load item'); }
  }, [itemId]);

  useEffect(() => { loadItem(); }, [loadItem]);

  async function addComment(event: FormEvent) {
    event.preventDefault();
    if (!userId || !itemId || !comment.trim()) return;
    await requestAPI.addComment(comment.trim(), userId, Number(itemId));
    setComment('');
    await loadItem();
  }

  async function toggleLike() {
    if (userId && itemId) await requestAPI.toggleLike(userId, Number(itemId));
  }

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!item) return <Typography sx={{ py: 5 }}>Loading...</Typography>;

  return (
    <Stack spacing={3} sx={{ py: { xs: 2, md: 5 }, maxWidth: 820 }}>
      <Typography variant="h3" sx={{ fontWeight: 800 }}>{item.title}</Typography>
      {item.collection && <Typography color="text.secondary">{item.collection.title}</Typography>}
      <Button onClick={toggleLike} startIcon={<FavoriteIcon />} sx={{ alignSelf: 'flex-start' }}>Like</Button>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5">Comments</Typography>
        <Stack spacing={1} sx={{ my: 2 }}>{item.comments?.map((entry) => <Typography key={entry.id}>{entry.content}</Typography>)}</Stack>
        <Stack component="form" direction={{ xs: 'column', sm: 'row' }} spacing={1} onSubmit={addComment}>
          <TextField fullWidth size="small" value={comment} onChange={(event) => setComment(event.target.value)} label="Add comment" />
          <Button type="submit" variant="contained">Save</Button>
        </Stack>
      </Paper>
    </Stack>
  );
};
