import React, { FC, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { Box, IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { CollectionType } from '../../types';
import CardCollection from '../../shared/components/CardCollection/CardCollection';

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
    height: '18rem',
    marginTop: '1rem',
    backgroundColor: 'rgba(31, 42, 47, 0.06)',
    overflow: 'hidden',

    [theme.breakpoints.down('sm')]: {
      height: '20rem',
    },

    '& > :first-child': {
      height: '100% !important',

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
  navButton: {
    width: '3.25rem',
    height: '100%',
    minHeight: '100%',
    padding: 0,
    borderRadius: 0,
    color: theme.palette.primary.main,
    transition: 'background-color 180ms ease',

    '&:hover': {
      backgroundColor: 'rgba(31, 42, 47, 0.14)',
    },

    '&.Mui-disabled': {
      color: 'rgba(31, 42, 47, 0.2)',
    },
  },
  page: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    padding: '3rem',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      paddingBottom: '2rem',
      overflowX: 'auto',
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

  const PAGE_SIZE = 3;

  const classes = useStyles();

  function handleIncreasePage() {
    setPage(page + 1);
    getUserCollections(id, page + 1);
  }

  function handleDecreasePage() {
    setPage(page - 1);
  }

  return (
    <Carousel
      autoPlay={false}
      NavButton={({ onClick, next }) => (
        <IconButton
          className={classes.navButton}
          disabled={next
            ? PAGE_SIZE * page >= collections.countCollections
            : page === 1}
          onClick={() => {
            onClick();
            if (next) {
              handleIncreasePage();
            } else {
              handleDecreasePage();
            }
          }}
        >
          {next ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      )}
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
