import React, { FC, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Grid,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router';
import moment from 'moment';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import TagIcon from '@mui/icons-material/Tag';
import { ItemType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

interface IItemPage {
  userId: number;
  targetItem: ItemType;
  getTargetItem: (itemId: number, collectionId: number) => void;
  toggleLike: (userId: number, itemId: number) => void;
  likes: { itemId: number }[] | null;
  getAllComments: (itemId: number) => void;
  addComment: (content: string, userId: number, itemId: number) => void;
  setCommentsTouched: (itemId: number) => void;
  customFields: string[];
}

const ItemPage: FC<IItemPage> = ({
  targetItem,
  getTargetItem,
  toggleLike,
  userId,
  likes,
  getAllComments,
  addComment,
  setCommentsTouched,
  customFields,
}) => {
  const [value, setValue] = useState<string>('');

  const { collectionId, itemId } = useParams();

  const { language } = useLanguage();

  useEffect(() => {
    if (collectionId && itemId) {
      if (!targetItem) getTargetItem(+itemId, +collectionId);
      setCommentsTouched(+itemId);
      getAllComments(+itemId);
    }
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();

    if (value.trim()) {
      addComment(value, userId, targetItem.id);
      setValue('');
    }
  }

  function getCollectionInfo(allFields: any) {
    const collectionInfo: any = [];
    allFields.forEach((obj: { [key: string]: string }) => {
      const [key] = Object.keys(obj);

      const newKey = key.replace(/Key/, 'Value');

      if (obj[key]) collectionInfo.push({ [newKey]: obj[key] });
    });

    return collectionInfo;
  }

  return (
    <Grid sx={{ height: '100%' }} container>
      {targetItem && (
        <Box sx={{ flex: 1 }}>
          <Checkbox
            checked={!!likes?.find((like) => like.itemId === targetItem.id)}
            color="error"
            icon={<FavoriteBorder color="error" />}
            checkedIcon={<Favorite color="error" />}
            onChange={() => {
              if (userId && targetItem.id) {
                toggleLike(userId, targetItem.id);
              }
            }}
          />
          <Typography variant="h2">{targetItem.title}</Typography>
          <Typography variant="body1">
            {targetItem.likes ? targetItem.likes.length : 0}
            {' '}
            {language.itemPage.likes}
          </Typography>
          <Typography variant="body1">
            {language.itemPage.created}
            {' '}
            {moment(targetItem.createdAt).format('DD/MM/YYYY')}
          </Typography>
          <Avatar
            src={`data:application/pdf;base64,${targetItem.icon}`}
            sx={{ width: '10rem', height: '10rem' }}
          />
          <Box>
            {targetItem.tags?.map((tag, idx: any) => (
              <Chip
                icon={<TagIcon />}
                variant="outlined"
                color="warning"
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                label={tag.content}
              />
            ))}
          </Box>
          {customFields
            && getCollectionInfo(customFields).map(
              (obj: { [key: string]: string }) => {
                const [key] = Object.keys(obj);
                return (
                  targetItem[key as keyof ItemType] && (
                  <Box
                    key={key}
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      columnGap: '3rem',
                      padding: '1rem',
                    }}
                  >
                    <Typography
                      sx={{ textDecoration: 'underline' }}
                      variant="body2"
                    >
                      {obj[key].split(':')[0] || obj[key]}
                    </Typography>
                    <Typography variant="body1">
                      {targetItem[key as keyof ItemType]}
                    </Typography>
                  </Box>
                  )
                );
              },
            )}
          <hr />
          <Typography variant="h2">{language.itemPage.comments}</Typography>
          {/* {isAuth && ( */}
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                columnGap: '0.7rem',
              }}
            >
              <TextareaAutosize
                style={{ flex: 1 }}
                placeholder={language.itemPage.addComment}
                required
                value={value}
                onChange={(e: any) => setValue(e.target.value)}
              />
              <Button type="submit">{language.itemPage.addComment}</Button>
            </Box>
          </form>
          {/* )} */}
          <hr />
          {targetItem.comments
                && targetItem.comments.map((comment) => (
                  <Box
                    sx={{
                      position: 'relative',
                      backgroundColor:
                        comment.status === 'untouched' ? 'gray' : 'none',
                    }}
                    key={comment.createdAt}
                  >
                    <Typography
                      sx={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                      }}
                      variant="body2"
                    >
                      Created:
                      {' '}
                      {moment(comment.createdAt).format('DD/MM/YYYY')}
                    </Typography>
                    {comment.user.id !== userId ? (
                      <Typography variant="body2">
                        {comment.user.name}
                        {' '}
                        {comment.user.surname}
                      </Typography>
                    ) : (
                      <Typography variant="body2">
                        {language.itemPage.myComments}
                      </Typography>
                    )}
                    <Typography variant="body2">{comment.content}</Typography>
                  </Box>
                ))}
        </Box>
      )}
    </Grid>

  );
};

export default ItemPage;
