import React, { FC, useEffect } from 'react';
import {
  ListItem,
  List,
  ListSubheader,
  Button,
  Box,
  Typography,
  Avatar,
} from '@mui/material';
import MDEditor from '@uiw/react-md-editor';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { Backdrop, makeStyles, Paper } from '@material-ui/core';
import { CollectionType, ItemType } from '../../types';
import { useLanguage } from '../../context/LanguageContext';

const StyledButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  zIndex: theme.zIndex.drawer + 1,
  top: 0,
  right: 0,
  maxWidth: '3.2rem',
  maxHeight: '3.2rem',
  minWidth: '3.2rem',
  minHeight: '3.2rem',
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.common.white,
}));

const useStyles = makeStyles((theme) => ({
  back: {
    zIndex: theme.zIndex.drawer + 2,
  },
  paper: {
    position: 'relative',
    width: '60%',
    height: '150px',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
    },
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1.4rem',
    padding: '0 1.4rem',
    width: '100% !important',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
    },
  },
  action: {
    display: 'flex',
    width: '100%',
    position: 'sticky',
    bottom: 0,
    backgroundColor: theme.palette.common.white,
  },
}));

interface IModalDelete {
  openModal: boolean;
  setOpen: (state: boolean) => void;
  collectionsDel?: Array<CollectionType | null>;
  itemsDel?: Array<ItemType | null>;
  pullOutCollection?: (collectionId: number) => void;
  deleteCollection?: (collectionId: number) => void;
  pullOutItem?: (itemId: number) => void;
  deleteItem?: (itemId: number) => void;
}

const ModalDelete: FC<IModalDelete> = ({
  openModal,
  setOpen,
  collectionsDel,
  itemsDel,
  pullOutCollection,
  deleteCollection,
  pullOutItem,
  deleteItem,
}) => {
  const classes = useStyles();

  const { language } = useLanguage();

  useEffect(() => {
    if (!itemsDel?.length) setOpen(false);
  }, [itemsDel]);

  useEffect(() => {
    if (!collectionsDel?.length) setOpen(false);
  }, [collectionsDel]);

  return (
    <Backdrop className={classes.back} open={openModal}>
      <Paper className={classes.paper}>
        <StyledButton onClick={() => setOpen(false)} variant="contained">
          <CloseIcon fontSize="large" />
        </StyledButton>
        <List
          sx={{
            bgcolor: 'background.paper',
            overflow: 'auto',
            paddingBottom: 0,
            width: '100%',
            height: '100%',
          }}
          subheader={<li />}
        >
          {collectionsDel?.map(
            (collection) => collection && (
            <ListItem
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                height: '100%',
              }}
              key={collection.id}
            >
              <ListSubheader
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: '1000',
                  width: '100%',
                  bgcolor: 'background.paper',
                }}
              >
                {collection.theme}
              </ListSubheader>
              <Box className={classes.listItem}>
                <ListItem
                  sx={{ flex: 1 }}
                  key={`Collection-${collection.createdAt}`}
                >
                  <MDEditor.Markdown
                    style={{
                      backgroundColor: 'transparent',
                    }}
                    source={collection.description!.replace(
                      /&&#&&/gim,
                      '\n',
                    )}
                  />
                </ListItem>
              </Box>
              <Box className={classes.action}>
                <Button
                  sx={{
                    flex: 1,
                  }}
                  onClick={() => {
                    if (collection.id) deleteCollection!(collection.id);
                  }}
                  color="error"
                >
                  {language.modalDelete.delete}
                </Button>
                <Button
                  sx={{
                    flex: 1,
                  }}
                  onClick={() => {
                    if (collection.id) pullOutCollection!(collection.id);
                  }}
                >
                  {language.modalDelete.pullOut}
                </Button>
              </Box>
            </ListItem>
            ),
          )}
          {itemsDel?.map(
            (item) => item && (
            <ListItem
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: 0,
                height: '100%',
              }}
              key={item.id}
            >
              <ListSubheader
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  zIndex: '1000',
                  width: '100%',
                  bgcolor: 'background.paper',
                }}
              >
                <Typography variant="h4">{item.title}</Typography>
                <Typography variant="subtitle1">
                  {language.modalDelete.created}
                  {' '}
                  {moment(item.createdAt).format('DD/MM/YYYY')}
                </Typography>
              </ListSubheader>
              <Box className={classes.listItem}>
                {item.icon && (
                <Avatar
                  alt={item.title}
                  src={`data:application/pdf;base64,${item.icon}`}
                />
                )}
              </Box>
              <Box className={classes.action}>
                <Button
                  sx={{
                    flex: 1,
                  }}
                  onClick={() => {
                    if (item.id) deleteItem!(item.id);
                  }}
                  color="warning"
                >
                  {language.modalDelete.delete}
                </Button>
                <Button
                  sx={{
                    flex: 1,
                  }}
                  onClick={() => {
                    if (item.id) pullOutItem!(item.id);
                  }}
                >
                  {language.modalDelete.pullOut}
                </Button>
              </Box>
            </ListItem>
            ),
          )}
        </List>
      </Paper>
    </Backdrop>
  );
};

export default ModalDelete;
