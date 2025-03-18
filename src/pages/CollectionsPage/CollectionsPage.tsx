import React, { FC, FormEvent, useCallback, useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { requestAPI } from '../../api/api';
import { useLanguage } from '../../context/LanguageContext';
import { useTypedSelector } from '../../redux';
import { userIdSelector } from '../../redux/selectors/user-selector';

type ItemView = { id: number; title: string };
type CollectionView = {
  id: number;
  title: string;
  description: string;
  subject: string;
  items?: ItemView[];
};

const subjects = ['books', 'movies', 'bands', 'memories', 'artworks'];

export const CollectionsPage: FC = () => {
  const { language } = useLanguage();
  const userId = useTypedSelector(userIdSelector);
  const [collections, setCollections] = useState<CollectionView[]>([]);
  const [selected, setSelected] = useState<CollectionView | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subject, setSubject] = useState(subjects[0]);
  const [itemTitle, setItemTitle] = useState('');
  const [error, setError] = useState('');

  const loadCollections = useCallback(async () => {
    if (!userId) return;
    try {
      setError('');
      const result = await requestAPI.getAllCollections(userId);
      setCollections(Array.isArray(result) ? result : []);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load collections');
    }
  }, [userId]);

  useEffect(() => {
    loadCollections();
  }, [loadCollections]);

  async function selectCollection(collection: CollectionView) {
    try {
      const result = await requestAPI.getCollection(collection.id);
      setSelected(result || collection);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to load collection');
    }
  }

  async function createCollection(event: FormEvent) {
    event.preventDefault();
    if (!userId || !title.trim()) return;
    try {
      await requestAPI.createCollection({
        title: title.trim(),
        description: description.trim(),
        subject,
        userId,
      });
      setTitle('');
      setDescription('');
      await loadCollections();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to create collection');
    }
  }

  async function addItem(event: FormEvent) {
    event.preventDefault();
    if (!selected || !itemTitle.trim()) return;
    try {
      await requestAPI.createItem({ title: itemTitle.trim(), collectionId: selected.id });
      setItemTitle('');
      await selectCollection(selected);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to create item');
    }
  }

  async function deleteCollection() {
    if (!selected) return;
    try {
      await requestAPI.deleteCollection(selected.id);
      setSelected(null);
      await loadCollections();
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to delete collection');
    }
  }

  return (
    <Stack spacing={3} sx={{ py: { xs: 2, md: 5 } }}>
      <Box>
        <Typography variant="h3" sx={{ fontWeight: 800 }}>{language.common.collections}</Typography>
        <Typography color="text.secondary">{language.collectionsPage.myCollections}</Typography>
      </Box>
      {error && <Alert severity="error">{error}</Alert>}
      <Paper component="form" onSubmit={createCollection} sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={2}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>{language.common.createCollection}</Typography>
          <TextField label={language.modalCreateCollection.title} value={title} onChange={(event) => setTitle(event.target.value)} required />
          <TextField label={language.modalCreateCollection.description} value={description} onChange={(event) => setDescription(event.target.value)} multiline minRows={2} />
          <Select value={subject} onChange={(event) => setSubject(event.target.value)}>
            {subjects.map((value) => <MenuItem key={value} value={value}>{value}</MenuItem>)}
          </Select>
          <Button type="submit" variant="contained" startIcon={<AddIcon />} sx={{ alignSelf: 'flex-start' }}>{language.common.save}</Button>
        </Stack>
      </Paper>
      {!collections.length && <Typography color="text.secondary">{language.common.emptyCollections}</Typography>}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
        {collections.map((collection) => (
          <Card key={collection.id} variant={selected?.id === collection.id ? 'elevation' : 'outlined'} onClick={() => selectCollection(collection)} sx={{ cursor: 'pointer' }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{collection.title}</Typography>
              <Typography color="text.secondary">{collection.description || collection.subject}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      {selected && <Paper sx={{ p: { xs: 2, md: 3 } }}>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{selected.title}</Typography>
              <Typography color="text.secondary">{selected.description}</Typography>
            </Box>
            <Button color="error" startIcon={<DeleteOutlineIcon />} onClick={deleteCollection}>{language.modalDelete.delete}</Button>
          </Stack>
          <Divider />
          {selected.items?.length ? selected.items.map((item) => <Typography key={item.id}>{item.title}</Typography>) : <Typography color="text.secondary">{language.common.noItems}</Typography>}
          <Box component="form" onSubmit={addItem}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
              <TextField fullWidth size="small" label={language.common.itemTitle} value={itemTitle} onChange={(event) => setItemTitle(event.target.value)} required />
              <Button type="submit" variant="outlined" startIcon={<AddIcon />}>{language.common.addItem}</Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>}
    </Stack>
  );
};
