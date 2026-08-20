import React, { FC } from 'react';
import { Box, makeStyles } from '@material-ui/core';

import CardItem from '../../shared/components/CardItem/CardItem';
import { CollectionType, ItemType } from '../../types';
import CarouselComponent from '../../components/Carousel/Carousel';
import TagCloudComponent from '../../shared/components/TagsCloud/TagCloud';

const useStyles = makeStyles({
  list: {
    display: 'flex',
    columnGap: '0.7rem',
    overflowX: 'auto',
    padding: '1rem 0',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

interface IHomePage {
  collections: CollectionType[] | null;
  list: ItemType[] | null;
  toogleLike: (userId: number, itemId: number) => void;
  userId: number;
  likes: { itemId: number }[] | null;
  tags: any[];
  searchItemsByTag: (tag: string) => void;
}

const HomePage: FC<IHomePage> = ({
  list,
  userId,
  collections,
  toogleLike,
  likes,
  tags,
  searchItemsByTag,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.item}>
      {!!collections?.length && <CarouselComponent collections={collections} />}

      {!!tags?.length && (
        <TagCloudComponent tags={tags} searchItemsByTag={searchItemsByTag} />
      )}
      <Box className={classes.list}>
        {list?.map((item: ItemType) => (
          <CardItem
            item={item}
            likes={likes}
            key={item.id}
            toogleLike={toogleLike}
            userId={userId}
          />
        ))}
      </Box>
    </Box>
  );
};

export default HomePage;
