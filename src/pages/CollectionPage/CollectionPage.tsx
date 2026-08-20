import React, { FC, useState } from 'react';
import {
  Avatar,
  Badge,
  Box,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MDEditor from '@uiw/react-md-editor';
import moment from 'moment';
import AddIcon from '@mui/icons-material/Add';
import { ItemInitType, ItemType } from '../../types';
import Sidebar from '../../components/Sidebar/Sidebar';
import Table from '../../components/Table/Table';
import ItemForm from '../../components/ItemForm/ItemForm';
import ModalDelete from '../../components/ModalDelete/ModalDelete';
import ModalEditItem from '../../components/ModalEditItem/ModalEditItem';
import { useLanguage } from '../../context/LanguageContext';

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.common.black,
  },
}));

interface ICollectionPage {
  userId: number;
  id: number;
  icon: any;
  description: string;
  theme: string;
  customFields: any;
  createdAt: string;
  list: ItemType[] | null;
  role: 'Admin' | 'User' | 'Reader' | null;
  createNewItem: (itemInfo: ItemInitType) => void;
  setTargetItem: (item: ItemType) => void;
  listEditItems: Array<ItemType | null>;
  listDeleteItems: Array<ItemType | null>;
  setEditItems: (itemIds: number[]) => void;
  setDeleteItems: (itemIds: number[]) => void;
  pullOutItem: (itemId: number) => void;
  deleteItem: (itemId: number) => void;
  updateItem: (item: any) => void;
  toogleLike: (userId: number, itemId: number) => void;
  authorId: number;
  likes: { itemId: number }[] | null;
  searchMatchTags: (tag: string) => void;
  matchTags: any;
  getCollectionItems: (collectionId: number) => void;
}

const CollectionPage: FC<ICollectionPage> = ({
  id,
  icon,
  description,
  theme,
  customFields,
  createdAt,
  setTargetItem,
  createNewItem,
  list,
  role,
  listEditItems,
  listDeleteItems,
  setEditItems,
  setDeleteItems,
  pullOutItem,
  deleteItem,
  updateItem,
  toogleLike,
  authorId,
  userId,
  likes,
  searchMatchTags,
  matchTags,
  getCollectionItems,
}) => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  const { language } = useLanguage();

  return (
    <>
      <ModalEditItem
        customFields={customFields}
        openModal={openModalEdit}
        setOpen={setOpenModalEdit}
        itemsEdit={listEditItems}
        pullOutItem={pullOutItem}
        updateItem={updateItem}
        searchMatchTags={searchMatchTags}
        matchTags={matchTags}
      />
      <ModalDelete
        openModal={openModalDelete}
        setOpen={setOpenModalDelete}
        itemsDel={listDeleteItems}
        pullOutItem={pullOutItem}
        deleteItem={deleteItem}
      />
      {customFields && (
        <ItemForm
          customFields={customFields}
          collectionId={id}
          openForm={openForm}
          setOpenForm={setOpenForm}
          createNewItem={createNewItem}
          searchMatchTags={searchMatchTags}
          matchTags={matchTags}
        />
      )}
      <Grid
        sx={{ height: '100%' }}
        container
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      >
        <Grid item lg={2.5} md={2.7} xs={12} sm={12}>
          {(authorId === userId || role === 'Admin') && (
            <Sidebar>
              <StyledListItemButton
                onClick={() => setOpenForm(true)}
                sx={(theme) => ({
                  width: '100%',

                  [theme.breakpoints.down('sm')]: {
                    justifyContent: 'center',
                  },

                  '& .MuiListItemIcon-root': {
                    [theme.breakpoints.down('sm')]: {
                      justifyContent: 'center',
                    },
                  },
                  '& .MuiListItemText-root': {
                    [theme.breakpoints.down('sm')]: {
                      display: 'none',
                    },
                  },
                })}
              >
                <ListItemIcon>
                  <AddIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary={language.collectionPage.createItem} />
              </StyledListItemButton>
              <StyledListItemButton
                sx={(theme) => ({
                  width: '100%',

                  [theme.breakpoints.down('sm')]: {
                    justifyContent: 'center',
                  },

                  '& .MuiListItemIcon-root': {
                    [theme.breakpoints.down('sm')]: {
                      justifyContent: 'center',
                    },
                  },
                  '& .MuiListItemText-root': {
                    [theme.breakpoints.down('sm')]: {
                      display: 'none',
                    },
                  },
                })}
                onClick={() => {
                  if (listEditItems?.length === 0) return;

                  setOpenModalEdit(true);
                }}
              >
                <ListItemIcon>
                  <Badge badgeContent={listEditItems.length} color="warning">
                    <EditIcon color="secondary" />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary={language.collectionPage.edit} />
              </StyledListItemButton>
              <StyledListItemButton
                sx={(theme) => ({
                  width: '100%',

                  [theme.breakpoints.down('sm')]: {
                    justifyContent: 'center',
                  },

                  '& .MuiListItemIcon-root': {
                    [theme.breakpoints.down('sm')]: {
                      justifyContent: 'center',
                    },
                  },
                  '& .MuiListItemText-root': {
                    [theme.breakpoints.down('sm')]: {
                      display: 'none',
                    },
                  },
                })}
                onClick={() => {
                  if (listDeleteItems?.length === 0) return;

                  setOpenModalDelete(true);
                }}
              >
                <ListItemIcon>
                  <Badge badgeContent={listDeleteItems.length} color="error">
                    <DeleteIcon color="secondary" />
                  </Badge>
                </ListItemIcon>
                <ListItemText primary={language.collectionPage.delete} />
              </StyledListItemButton>
            </Sidebar>
          )}
        </Grid>
        <Grid item={false} lg={9.5} md={9.3} xs={12} sm={12}>
          <Box
            sx={(theme) => ({
              display: 'flex',
              columnGap: '2rem',
              padding: '1.4rem',

              [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
              },
            })}
          >
            <Avatar
              src={`data:application/pdf;base64,${icon}`}
              alt="mmmmm"
              sx={{ width: '10rem', height: '10rem' }}
            >
              {icon && 'Empty'}
            </Avatar>
            <Box>
              <Typography variant="h2">{theme}</Typography>
              <Typography variant="body2">
                {language.collectionPage.created}
                {' '}
                {moment(createdAt).format('DD/MM/YYYY')}
              </Typography>
            </Box>
          </Box>
          {description && (
            <MDEditor.Markdown
              source={description.replace(/&&#&&/gim, '\n')}
              style={{
                backgroundColor: 'transparent',
              }}
            />
          )}
          {customFields && (
            <Table
              collectionId={id}
              list={list}
              setTargetItem={setTargetItem}
              setEditItems={setEditItems}
              setDeleteItems={setDeleteItems}
              toggleLike={toogleLike}
              userId={userId}
              authorId={authorId}
              likes={likes}
              getCollectionItems={getCollectionItems}
              customFields={customFields}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default CollectionPage;
