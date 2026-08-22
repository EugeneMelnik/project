import React, { FC } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { CollectionType } from '../../types';
import Slider from '../../components/Slider/Slider';
import { useLanguage } from '../../context/LanguageContext';

interface ICollectionsPage {
  id: number;
  allCollections:
  | {
    id: number;
    name: string;
    surname: string;
    collections: {
      collections: CollectionType[] | null;
      countCollections: number;
    };
  }[]
  | null;
  myCollections: {
    countCollections: number;
    collections: CollectionType[] | null;
  };
  setCollection: (collectionId: CollectionType) => void;
  getMyCollections: (userId: number, page?: number) => void;
  getUserCollections: (userId: number, page?: number) => void;
}

const CollectionsPage: FC<ICollectionsPage> = ({
  id,
  allCollections,
  myCollections,
  setCollection,
  getUserCollections,
  getMyCollections,
}) => {
  const { language } = useLanguage();
  return (
    <Box sx={{ width: '100%', maxWidth: '1800px', mx: 'auto', px: { xs: 1, md: 3 }, py: 3 }}>
      <Typography variant="h2" sx={{ mb: 1 }}>{language.collectionsPage.myCollections}</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        {myCollections.countCollections} {language.userPage.collections.toLowerCase()}
      </Typography>
      {myCollections.countCollections !== 0 && (
        <Box sx={{ mb: 5 }}>
          <Slider
            id={id}
            collections={myCollections}
            setCollection={setCollection}
            getUserCollections={getMyCollections}
          />
        </Box>
      )}
      {allCollections?.filter((user) => user.id !== id).map(
        (user) => user.collections.countCollections !== 0 && (
        <Box key={user.id} sx={{ mb: 5 }}>
          <Typography variant="h4">{user.name} {user.surname}</Typography>
          {user.collections && (
          <Slider
            id={user.id}
            collections={user.collections}
            setCollection={setCollection}
            getUserCollections={getUserCollections}
          />
          )}
        </Box>
        ),
      )}
      {!myCollections.countCollections && !allCollections?.some((user) => user.collections.countCollections) && (
        <Paper variant="outlined" sx={{ p: 5, textAlign: 'center' }}>
          <Typography variant="h5">{language.userPage.noCollections}</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default CollectionsPage;
