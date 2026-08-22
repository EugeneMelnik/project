import React, { FC } from 'react';
import { Box, makeStyles } from '@material-ui/core';
import { Typography } from '@mui/material';

import CardItem from '../../shared/components/CardItem/CardItem';
import { CollectionType, ItemType } from '../../types';
import CarouselComponent from '../../components/Carousel/Carousel';
import TagCloudComponent from '../../shared/components/TagsCloud/TagCloud';
import { useLanguage } from '../../context/LanguageContext';

const useStyles = makeStyles({
  list: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
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
  isAuth: boolean;
  likes: { itemId: number }[] | null;
  tags: { content: string; value?: number }[] | null;
  searchItemsByTag: (tag: string) => void;
}

const HomePage: FC<IHomePage> = ({
  list,
  userId,
  collections,
  toogleLike,
  likes,
  isAuth,
  tags,
  searchItemsByTag,
}) => {
  const classes = useStyles();
  const { language } = useLanguage();

  return (
    <Box className={classes.item}>
      {!!collections?.length && (
        <Box>
          <Typography variant="h3" sx={{ px: { xs: 1, md: 3 }, pt: 2 }}>
            {language.homePage.topCollections}
          </Typography>
          <CarouselComponent collections={collections} />
        </Box>
      )}
      {!!list?.length && (
        <>
          <Typography variant="h3" sx={{ px: { xs: 1, md: 3 }, pt: 2 }}>
            {language.homePage.popularItems}
          </Typography>
          <Box className={classes.list}>
        {list?.map((item: ItemType) => (
          <CardItem
            item={item}
            likes={likes}
            key={item.id}
            toogleLike={toogleLike}
            userId={userId}
            isAuth={isAuth}
          />
        ))}
          </Box>
        </>
      )}
      {!!tags?.length && (
        <TagCloudComponent tags={tags} searchItemsByTag={searchItemsByTag} />
      )}
    </Box>
  );
};

export default HomePage;
