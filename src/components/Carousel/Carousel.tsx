import React, { FC } from 'react';
import { CardMedia, Paper, Typography } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import MDEditor from '@uiw/react-md-editor';
import { Link as RouterLink } from 'react-router-dom';
import { alpha, Box, Link } from '@mui/material';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import RoutesApp from '../../constants/routes';
import { CollectionType } from '../../types';

const StyledCarousel = styled(Carousel)(({ theme }) => ({
  position: 'relative',
  padding: '1.3rem',
  margin: '2.5rem 1.3rem',
  backgroundColor: theme.palette.common.black,
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  padding: '0.7rem',
  right: 0,
  maxHeight: '100%',
  overflow: 'hidden',
  width: '30%',
  backgroundColor: alpha(theme.palette.common.white, 0.3),

  '& > *': {
    margin: '0.7rem 0',
  },
}));

interface ICarousel {
  collections: CollectionType[] | null;
}

const CarouselComponent: FC<ICarousel> = ({ collections }) => (
  <StyledCarousel>
    {collections?.map((collection: CollectionType) => (
      <Link
        component={RouterLink}
        to={`${RoutesApp.CollectionLink}${collection.id}`}
        key={collection.id}
      >
        <StyledPaper>
          <Box>
            <Typography variant="h3">{collection.theme}</Typography>
            <Typography variant="body2">
              Created:
              {' '}
              {moment(collection.createdAt).format('DD/MM/YYYY')}
            </Typography>
            <MDEditor.Markdown
              style={{
                backgroundColor: 'transparent',
              }}
              source={collection.description?.replace(/&&#&&/gim, '\n')}
            />
          </Box>
        </StyledPaper>
        {collection.icon && (
          <CardMedia
            style={{
              height: '60vh',
            }}
            component="img"
            image={`data:application/pdf;base64,${collection.icon}`}
            alt={collection.title?.toString()}
          />
        )}
      </Link>
    ))}
  </StyledCarousel>
);

export default CarouselComponent;
