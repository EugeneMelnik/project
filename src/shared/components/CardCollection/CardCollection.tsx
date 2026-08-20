import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  CardMedia, Link, Typography, Box, alpha, Button,
} from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import { makeStyles } from '@material-ui/core';
import MDEditor from '@uiw/react-md-editor';
import { styled } from '@mui/material/styles';
import RoutesApp from '../../../constants/routes';
import { CollectionType } from '../../../types';
import { useLanguage } from '../../../context/LanguageContext';

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: '12rem',
  width: '12rem',
  height: '15rem',
  overflow: 'auto',

  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
}));

const useStyles = makeStyles({
  card: {
    margin: '0.3rem',
    position: 'relative',
    maxWidth: '12rem',
    minWidth: '12rem',

  },
  body: {
    height: '20rem',
  },
  action: {
    position: 'absolute',
    top: 0,
    display: 'flex',
    width: '100%',
    zIndex: 1,

    '& > .MuiButton-root': {
      flex: 1,
    },
  },
});

interface ICardCollection {
  collection: CollectionType;
  setCollection: (collection: CollectionType) => void;
  type: 'private' | 'public';
  setEditCollection?: (collectionId: number) => void;
  setDeleteCollection?: (collectionId: number) => void;
}

const CardCollection: FC<ICardCollection> = ({
  collection,
  setCollection,
  type,
  setEditCollection,
  setDeleteCollection,
}) => {
  const classes = useStyles();

  const { language } = useLanguage();

  return (
    <Box className={classes.card}>
      {type === 'private' && (
        <Box className={classes.action}>
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              if (collection.id) {
                setEditCollection!(collection.id);
              }
            }}
          >
            {language.userPage.edit}
          </Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => {
              if (collection.id) {
                setDeleteCollection!(collection.id);
              }
            }}
          >
            {language.userPage.delete}
          </Button>
        </Box>
      )}
      <Link
        component={RouterLink}
        to={`${RoutesApp.CollectionLink}${collection.id}`}
        onClick={() => setCollection(collection)}
      >
        <StyledCard variant="outlined">
          {collection.icon && (
            <CardMedia
              component="img"
              height="194"
              image={`data:application/pdf;base64,${collection.icon}`}
              alt={collection.title?.toString()}
            />
          )}
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {collection.theme}
            </Typography>
            <MDEditor.Markdown
              style={{
                backgroundColor: 'transparent',
              }}
              source={collection.description?.replace(/&&#&&/gim, '\n')}
            />
          </CardContent>
        </StyledCard>
      </Link>
    </Box>
  );
};

export default CardCollection;
