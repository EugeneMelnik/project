import React, { FC } from 'react';
import { Typography } from '@mui/material';
import Slider from '../../components/Slider/Slider';
import CardItem from '../../shared/components/CardItem/CardItem';
import { CollectionType, ItemType, SearchUserType } from '../../types';

interface ISearchPage {
  userId: number;
  listSearch: ItemType[] | SearchUserType[] | null;
  setTargetCollection: (collection: CollectionType) => void;
  getTargetUserCollections: (id: number, page?: number) => void;
  toogleLike: (userId: number, itemId: number) => void;
  likes: { itemId: number }[] | null;
}

const SearchPage: FC<ISearchPage> = ({
  listSearch,
  setTargetCollection,
  getTargetUserCollections,
  userId,
  toogleLike,
  likes,
}) => (
  <>
    Search result
    {' '}
    {listSearch?.length}
    {' '}
    {listSearch?.length === 1 ? 'link' : 'links'}
    {listSearch?.map((data) => ('name' in data ? (
      <>
        <Typography variant="body2">
          {data.name}
          {' '}
          {data.surname}
        </Typography>
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
      </>
    ) : (
      <CardItem
        likes={likes}
        item={data}
        userId={userId}
        toogleLike={toogleLike}
      />
    )))}
  </>
);

export default SearchPage;
