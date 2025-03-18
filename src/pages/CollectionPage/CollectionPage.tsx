import React, { FC, useEffect, useState } from 'react';
import { Alert, Button, Card, CardContent, Stack, Typography } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useNavigate, useParams } from 'react-router-dom';
import { requestAPI } from '../../api/api';
import RoutesApp from '../../constants/routes';

type Collection = { id: number; title: string; description: string; subject: string; items?: { id: number; title: string }[] };

export const CollectionPage: FC = () => {
  const { collectionId } = useParams();
  const navigate = useNavigate();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!collectionId) return;
    requestAPI.getCollection(Number(collectionId)).then(setCollection).catch(() => setError('Unable to load collection'));
  }, [collectionId]);

  async function removeCollection() {
    if (!collection) return;
    await requestAPI.deleteCollection(collection.id);
    navigate(RoutesApp.CollectionsLink);
  }

  if (error) return <Alert severity="error">{error}</Alert>;
  if (!collection) return <Typography sx={{ py: 5 }}>Loading...</Typography>;

  return (
    <Stack spacing={3} sx={{ py: { xs: 2, md: 5 }, maxWidth: 820 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <div>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>{collection.title}</Typography>
          <Typography color="text.secondary">{collection.subject}</Typography>
          <Typography sx={{ mt: 2 }}>{collection.description}</Typography>
        </div>
        <Button color="error" startIcon={<DeleteOutlineIcon />} onClick={removeCollection}>Delete</Button>
      </Stack>
      {collection.items?.map((item) => (
        <Card key={item.id} variant="outlined" onClick={() => navigate(`${RoutesApp.ItemLink}${item.id}`)} sx={{ cursor: 'pointer' }}>
          <CardContent><Typography variant="h6">{item.title}</Typography></CardContent>
        </Card>
      ))}
    </Stack>
  );
};
