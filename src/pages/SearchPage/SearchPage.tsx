import React, { FC, FormEvent, useState } from 'react';
import { Button, Card, CardContent, Stack, TextField, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { requestAPI } from '../../api/api';
import RoutesApp from '../../constants/routes';

type Result = { id: number; title: string };

export const SearchPage: FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);

  async function search(event: FormEvent) {
    event.preventDefault();
    setResults(query.trim() ? await requestAPI.searchItems(query.trim()) : []);
  }

  return (
    <Stack spacing={3} sx={{ py: { xs: 2, md: 5 }, maxWidth: 820 }}>
      <Typography variant="h3" sx={{ fontWeight: 800 }}>Search</Typography>
      <Stack component="form" direction={{ xs: 'column', sm: 'row' }} spacing={1} onSubmit={search}>
        <TextField fullWidth value={query} onChange={(event) => setQuery(event.target.value)} label="Search items" />
        <Button type="submit" variant="contained" startIcon={<SearchIcon />}>Search</Button>
      </Stack>
      {results.map((result) => <Card key={result.id} variant="outlined" onClick={() => navigate(`${RoutesApp.ItemLink}${result.id}`)} sx={{ cursor: 'pointer' }}><CardContent><Typography variant="h6">{result.title}</Typography></CardContent></Card>)}
    </Stack>
  );
};
