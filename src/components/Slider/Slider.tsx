import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { Box, IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { CollectionType } from '../../types';
import CardCollection from '../../shared/components/CardCollection/CardCollection';
import { logWarning } from '../../services/logger';

interface ISlider {
  id: number;
  collections: {
    countCollections: number;
    collections: CollectionType[] | null;
  };
  setCollection: (collection: CollectionType) => void;
  getUserCollections: (userId: number, page?: number) => void;
  type?: 'private' | 'public';
  setEditCollection?: (collectionId: number) => void;
  setDeleteCollection?: (collectionId: number) => void;
}

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: '16rem',
    marginTop: '3.5rem',

    [theme.breakpoints.down('sm')]: {
      height: '20rem',
    },

    '& > :first-child': {
      height: '100% !important',
      overflowX: 'auto',

      '& > :first-child': {
        height: '100% !important',
        '& > *': {
          height: '100% !important',
          '& > *': {
            '& > *': {
              height: '100% !important',
            },
          },
        },
      },
    },
  },
  page: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    padding: '3rem',

    [theme.breakpoints.down('sm')]: {
      width: '900px',
      paddingBottom: '2rem',
    },

    '& > *:hover': {
      transform: 'scale(1.1)',
      zIndex: 2,
    },
  },
}));

const Slider: FC<ISlider> = ({
  type = 'public',
  collections,
  getUserCollections,
  id,
  setCollection,
  setEditCollection,
  setDeleteCollection,
}) => {
  const [page, setPage] = useState(1);
  const [btnDisable, setBtnDisable] = useState('');

  const PAGE_SIZE = 3;

  const classes = useStyles();

  function checkLimit(
    page: number,
    pageSize: number,
    countAllCollections: number,
  ) {
    return pageSize * page >= countAllCollections;
  }

  function handleIncreasePage() {
    if (checkLimit(page, PAGE_SIZE, collections.countCollections)) {
      logWarning('No more collections.');
      setBtnDisable('next');
      return;
    }
    setBtnDisable('');
    setPage(page + 1);
    getUserCollections(id, page + 1);
  }

  function handleDecreasePage() {
    if (page === 1) {
      setBtnDisable('prev');
      return;
    }

    setBtnDisable('');
    setPage(page - 1);
  }

  return (
    <Carousel
      autoPlay={false}
      NextIcon={(
        <IconButton
          disabled={btnDisable === 'next'}
          onClick={handleIncreasePage}
        >
          <ChevronRightIcon htmlColor="white" />
        </IconButton>
      )}
      PrevIcon={(
        <IconButton
          onClick={handleDecreasePage}
          disabled={btnDisable === 'prev'}
        >
          <ChevronLeftIcon htmlColor="white" />
        </IconButton>
      )}
      sx={{ height: '100%' }}
      className={classes.carousel}
      navButtonsAlwaysVisible
    >
      <Box className={classes.page}>
        {collections.collections
          ?.slice(
            page === 1 ? 0 : PAGE_SIZE * (page - 1),
            page === 1 ? PAGE_SIZE : PAGE_SIZE * (page - 1) + 1 + PAGE_SIZE,
          )
          .map(
            (collection) => collection && (
            <CardCollection
              key={collection.id}
              collection={collection}
              type={type}
              setCollection={setCollection}
              setEditCollection={setEditCollection}
              setDeleteCollection={setDeleteCollection}
            />
            ),
          )}
      </Box>
    </Carousel>
  );
};

export default Slider;
