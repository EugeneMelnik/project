import React, { FC } from 'react';
import { Typography } from '@mui/material';
import Slider from '../../components/Slider/Slider';
import CardItem from '../../shared/components/CardItem/CardItem';
import { CollectionType, ItemType } from '../../types';

interface ISearchPage {
  userId: number;
  listSearch: any;
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
    {listSearch?.map((data: any) => (data?.name ? (
      <>
        <Typography variant="body2">
          {data.name}
          {' '}
          {data.surname}
        </Typography>
        <Slider
          collections={data.collections}
          id={data.id}
          setCollection={setTargetCollection}
          getUserCollections={getTargetUserCollections}
        />
      </>
    ) : (
      <CardItem
        likes={likes}
        item={data as ItemType}
        userId={userId}
        toogleLike={toogleLike}
      />
    )))}
  </>
);

export default SearchPage;
