import React, { FC, FormEvent, useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Grid,
  Paper,
  TextareaAutosize,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router';
import moment from 'moment';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import TagIcon from '@mui/icons-material/Tag';
import MDEditor from '@uiw/react-md-editor';
import { CustomFieldType, ItemType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import RoutesApp from '../../constants/routes';
import { Link as RouterLink } from 'react-router-dom';

interface IItemPage {
  userId: number;
  targetItem: ItemType;
  getTargetItem: (itemId: number, collectionId: number) => void;
  clearTargetItem: () => void;
  toggleLike: (userId: number, itemId: number) => void;
  likes: { itemId: number }[] | null;
  getAllComments: (itemId: number) => void;
  addComment: (content: string, userId: number, itemId: number) => void;
  setCommentsTouched: (itemId: number) => void;
  customFields: CustomFieldType[] | null;
}

const ItemPage: FC<IItemPage> = ({
  targetItem,
  getTargetItem,
  clearTargetItem,
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
      clearTargetItem();
      getTargetItem(+itemId, +collectionId);
      setCommentsTouched(+itemId);
      getAllComments(+itemId);
    }
  }, [collectionId, itemId]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (value.trim()) {
      addComment(value, userId, targetItem.id);
      setValue('');
    }
  }

  function getCollectionInfo(allFields: CustomFieldType[]) {
    const collectionInfo: Record<string, string>[] = [];
    allFields.forEach((obj) => {
      const [key] = Object.keys(obj);

      const newKey = key.replace(/Key/, 'Value');

      if (obj[key]) collectionInfo.push({ [newKey]: obj[key] });
    });

    return collectionInfo;
  }

  return (
    <Grid sx={{ minHeight: '100%', py: { xs: 2, md: 4 } }} container>
      {targetItem && (
        <Box sx={{ flex: 1, width: '100%', maxWidth: '1800px', mx: 'auto', px: { xs: 1, md: 3 } }}>
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 4 }, mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
              {targetItem.icon && (
                <Avatar
                  src={`data:application/pdf;base64,${String(targetItem.icon)}`}
                  sx={{ width: { xs: '8rem', md: '10rem' }, height: { xs: '8rem', md: '10rem' } }}
                />
              )}
              <Box sx={{ flex: 1, minWidth: '14rem' }}>
                {targetItem.collectionId && (
                  <Typography
                    component={RouterLink}
                    to={`${RoutesApp.CollectionLink}${targetItem.collectionId}`}
                    variant="overline"
                    sx={{ color: 'secondary.main', textDecoration: 'none' }}
                  >
                    {targetItem.collection?.theme || 'Collection'}
                  </Typography>
                )}
                <Typography variant="overline">{language.itemPage.created}</Typography>
                <Typography variant="h2" sx={{ mb: 1 }}>{targetItem.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {moment(targetItem.createdAt).format('DD/MM/YYYY')}
                </Typography>
                {targetItem.collection?.description && (
                  <Box sx={{ mt: 1, maxWidth: '48rem', opacity: 0.8 }}>
                    <MDEditor.Markdown
                      source={targetItem.collection.description.replace(/&&#&&/gim, '\n')}
                      style={{ backgroundColor: 'transparent' }}
                    />
                  </Box>
                )}
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Checkbox
                  checked={!!likes?.find((like) => like.itemId === targetItem.id)}
                  color="error"
                  icon={<FavoriteBorder color="error" />}
                  checkedIcon={<Favorite color="error" />}
                  onChange={() => {
                    if (userId && targetItem.id) toggleLike(userId, targetItem.id);
                  }}
                />
                <Typography variant="body2">
                  {targetItem.likes ? targetItem.likes.length : 0} {language.itemPage.likes}
                </Typography>
              </Box>
            </Box>
          </Paper>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
            {targetItem.tags?.map((tag, idx: number) => (
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
                      {String(targetItem[key as keyof ItemType] || '')}
                    </Typography>
                  </Box>
                  )
                );
              },
            )}
          <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 }, mt: 3 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>{language.itemPage.comments}</Typography>
            <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                columnGap: '0.7rem',
              }}
            >
              <TextareaAutosize
                style={{ flex: 1, padding: '0.8rem', font: 'inherit', minHeight: '3rem' }}
                placeholder={language.itemPage.addComment}
                required
                value={value}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setValue(e.target.value)}
              />
              <Button variant="contained" type="submit">{language.itemPage.addComment}</Button>
            </Box>
            </form>
          </Paper>
          <Box sx={{ mt: 2, display: 'grid', gap: 1 }}>
              {targetItem.comments
                && targetItem.comments.filter((comment) => comment?.user).map((comment) => (
                  <Box
                    sx={{
                      position: 'relative',
                      backgroundColor: comment.status === 'untouched' ? 'action.hover' : 'background.paper',
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      p: 2,
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
          </Box>
      )}
    </Grid>

  );
};

export default ItemPage;
