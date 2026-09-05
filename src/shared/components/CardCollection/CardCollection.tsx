import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  CardMedia, Link, Typography, Box, alpha, Button, CardActions, Chip,
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
  height: '16rem',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderColor: alpha(theme.palette.primary.main, 0.2),
  transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',

  '&:hover': {
    borderColor: theme.palette.secondary.main,
    boxShadow: theme.shadows[5],
  },
}));

const useStyles = makeStyles({
  card: {
    margin: '0.45rem',
    position: 'relative',
    maxWidth: '12rem',
    minWidth: '12rem',
  },
  action: {
    position: 'absolute',
    top: '0.45rem',
    left: '0.45rem',
    right: '0.45rem',
    display: 'flex',
    zIndex: 1,
    gap: '0.35rem',

    '& > .MuiButton-root': {
      flex: 1,
      minWidth: 0,
      padding: '0.25rem',
      fontSize: '0.68rem',
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
              height="118"
              image={`data:application/pdf;base64,${collection.icon}`}
              alt={collection.title?.toString()}
            />
          )}
          <CardContent sx={{ flex: 1, p: 1.5, overflow: 'hidden' }}>
            <Typography variant="overline" color="secondary" sx={{ fontWeight: 700 }}>
              {collection.theme}
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 700, lineHeight: 1.2, mb: 0.6 }}
              noWrap
            >
              {collection.title}
            </Typography>
            <Box sx={{ maxHeight: '3.8rem', overflow: 'hidden', opacity: 0.8 }}>
              <MDEditor.Markdown
                style={{ backgroundColor: 'transparent', fontSize: '0.78rem' }}
                source={collection.description?.replace(/&&#&&/gim, '\n')}
              />
            </Box>
            <Chip
              size="small"
              variant="outlined"
              label={`${collection.list?.length || 0} items`}
              sx={{ mt: 1, maxWidth: '100%' }}
            />
          </CardContent>
          <CardActions sx={{ p: 1, pt: 0 }}>
            <Typography variant="caption" color="text.secondary" noWrap>
              {collection.createdAt
                ? new Date(collection.createdAt).toLocaleDateString()
                : ''}
            </Typography>
          </CardActions>
        </StyledCard>
      </Link>
    </Box>
  );
};

export default CardCollection;
