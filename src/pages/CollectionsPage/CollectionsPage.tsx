import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
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
    <>
      {myCollections.countCollections !== 0 && (
        <Box>
          <Typography variant="h3">
            {language.collectionsPage.myCollections}
          </Typography>
          <Slider
            id={id}
            collections={myCollections}
            setCollection={setCollection}
            getUserCollections={getMyCollections}
          />
        </Box>
      )}
      {allCollections?.slice(id ? 1 : 0).map(
        (user) => user.collections.countCollections !== 0 && (
        <Box key={user.id}>
          <Typography variant="h3">{user.name}</Typography>
          <Typography variant="h3">{user.surname}</Typography>
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
    </>
  );
};

export default CollectionsPage;
