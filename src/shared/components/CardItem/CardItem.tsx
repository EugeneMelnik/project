import React, { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  Link,
  Typography,
  alpha,
} from '@mui/material';
import Card from '@mui/material/Card';
import TagIcon from '@mui/icons-material/Tag';
import moment from 'moment';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import RoutesApp from '../../../constants/routes';
import { ItemType } from '../../../types';

const StyledCard = styled(Card)(({ theme }) => ({
  minWidth: '12rem',
  width: '12rem',
  height: '15rem',
  overflow: 'auto',

  '&:hover': {
    transform: 'scale(1.01)',
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
}));

interface ICardItem {
  item: ItemType;
  toogleLike: (userId: number, itemId: number) => void;
  userId: number;
  likes: { itemId: number }[] | null;
}

const CardItem: FC<ICardItem> = ({
  item, toogleLike, userId, likes,
}) => (
  <StyledCard>
    <Link
      component={RouterLink}
      to={`${RoutesApp.CollectionLink}${item.collectionId}${RoutesApp.ItemLink}${item.id}`}
    >
      Open
    </Link>
    {item.icon && (
      <CardMedia
        component="img"
        height="194"
        image={`data:application/pdf;base64,${item.icon}`}
        alt={item.title}
      />
    )}
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="body2">
        <strong style={{ margin: '0 0.3rem' }}>
          {item.likes ? item.likes.length : 0}
        </strong>
        likes
      </Typography>
      <Checkbox
        checked={!!likes?.find((like) => like.itemId === item.id)}
        color="error"
        icon={<FavoriteBorder color="error" />}
        checkedIcon={<Favorite color="error" />}
        onChange={() => {
          if (userId && item.id) {
            toogleLike(userId, item.id);
          }
        }}
      />
    </Box>
    {item.collection && (
      <CardContent
        sx={{
          padding: '0.3rem',
          overflowY: 'auto',
        }}
      >
        <Typography variant="body1">
          Title:
          {item.title}
        </Typography>
        <Typography variant="body1">
          Theme:
          {item.collection.theme}
        </Typography>
        <Typography variant="body2">Author:</Typography>
        <Typography variant="body2">
          {item.collection.user.name}
          {' '}
          {item.collection.user.surname}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: 'md', color: 'text.secondary' }}
        >
          Created:
          {' '}
          {moment(item.createdAt).format('DD/MM/YYYY')}
        </Typography>
      </CardContent>
    )}
    {item.tags?.map((tag, idx: any) => (
      <Chip
        icon={<TagIcon />}
        variant="outlined"
        color="warning"
        // eslint-disable-next-line react/no-array-index-key
        key={idx}
        label={tag.content}
      />
    ))}
  </StyledCard>
);

export default CardItem;
