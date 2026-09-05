import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import Slider from '../../components/Slider/Slider';
import CardItem from '../../shared/components/CardItem/CardItem';
import CardCollection from '../../shared/components/CardCollection/CardCollection';
import { CollectionType, ItemType, SearchUserType } from '../../types';

type SearchResult = ItemType | (CollectionType & { isCollection: boolean });

interface ISearchPage {
  userId: number;
  listSearch: SearchResult[] | SearchUserType[] | null;
  setTargetCollection: (collection: CollectionType) => void;
  getTargetUserCollections: (id: number, page?: number) => void;
  toogleLike: (userId: number, itemId: number) => void;
  likes: { itemId: number }[] | null;
  isAuth: boolean;
}

const SearchPage: FC<ISearchPage> = ({
  listSearch,
  setTargetCollection,
  getTargetUserCollections,
  userId,
  toogleLike,
  likes,
  isAuth,
}) => {
  const results = (listSearch || []) as Array<SearchResult | SearchUserType>;
  const itemResults = results.filter(
    (data) => !('name' in data) && !('isCollection' in data),
  );
  const collectionResults = results.filter((data) => 'isCollection' in data);
  const userResults = results.filter((data) => 'name' in data);

  return (
    <Box sx={{ maxWidth: '1800px', width: '100%', mx: 'auto', px: { xs: 1, md: 3 }, py: 3 }}>
      <Typography variant="h2" sx={{ mb: 1 }}>Search results</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {results.length} results
      </Typography>
      {itemResults.length > 0 && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>Elements</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            {itemResults.map((data) => (
              <CardItem
                key={data.id}
                likes={likes}
                item={data as ItemType}
                userId={userId}
                toogleLike={toogleLike}
                isAuth={isAuth}
              />
            ))}
          </Box>
        </Box>
      )}
      {collectionResults.length > 0 && (
        <Box sx={{ mb: 5 }}>
          <Typography variant="h4" sx={{ mb: 2 }}>Collections</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            {collectionResults.map((data) => (
              <CardCollection
                key={data.id}
                collection={data as CollectionType & { isCollection: boolean }}
                type="public"
                setCollection={setTargetCollection}
              />
            ))}
          </Box>
        </Box>
      )}
      {userResults.map((data) => ('name' in data ? (
        <React.Fragment key={`${data.name}-${data.surname}`}>
          <Typography variant="body2">{data.name} {data.surname}</Typography>
          <Slider
            collections={{
              collections: data.collections.filter(
                (collection): collection is CollectionType => collection !== null,
              ),
              countCollections: data.collections.length,
            }}
            id={data.id || 0}
            setCollection={setTargetCollection}
            getUserCollections={getTargetUserCollections}
          />
        </React.Fragment>
      ) : null))}
    </Box>
  );
};

export default SearchPage;
