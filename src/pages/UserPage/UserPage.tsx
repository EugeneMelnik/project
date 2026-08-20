import React, { FC, useState } from 'react';
import {
  Badge,
  Grid,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Sidebar from '../../components/Sidebar/Sidebar';
import CollectionForm from '../../components/CollectionForm/CollectionForm';
import Slider from '../../components/Slider/Slider';
import { CollectionInitType, CollectionType } from '../../types';
import ModalEditCollection from '../../components/ModalEditCollection/ModalEditCollection';
import ModalDelete from '../../components/ModalDelete/ModalDelete';
import { useLanguage } from '../../context/LanguageContext';

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    backgroundColor: theme.palette.common.black,
  },
}));

interface IUserPage {
  id: number;
  collections: {
    collections: CollectionType[] | null;
    countCollections: number;
  };
  createNewCollection: (collectionInfo: CollectionInitType) => void;
  deleteCollection: (collectionId: number) => void;
  setTargetCollection: (collection: CollectionType) => void;
  setEditCollection: (collectionId: number) => void;
  setDeleteCollection: (collectionId: number) => void;
  collectionsEdit: Array<CollectionType | null>;
  collectionsDel: Array<CollectionType | null>;
  updateCollection: (collection: any) => void;
  pullOutCollection: (collectionId: number) => void;
  getMyCollections: (userId: number, page?: number) => void;
  getCollectionThemes: () => void;
  collectionThemes: { id: number; value: string }[] | null;
}

const UserPage: FC<IUserPage> = ({
  collections,
  createNewCollection,
  setTargetCollection,
  setEditCollection,
  setDeleteCollection,
  collectionsEdit,
  deleteCollection,
  collectionsDel,
  updateCollection,
  pullOutCollection,
  getMyCollections,
  getCollectionThemes,
  collectionThemes,
  id,
}) => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  const { language } = useLanguage();

  return (
    <>
      <CollectionForm
        userId={id}
        openForm={openForm}
        setOpenForm={setOpenForm}
        createNewCollection={createNewCollection}
        collectionThemes={collectionThemes}
      />
      <ModalEditCollection
        openModal={openModalEdit}
        setOpen={setOpenModalEdit}
        collectionsEdit={collectionsEdit}
        updateCollection={updateCollection}
        pullOutCollection={pullOutCollection}
        collectionThemes={collectionThemes}
      />
      <ModalDelete
        openModal={openModalDelete}
        setOpen={setOpenModalDelete}
        collectionsDel={collectionsDel}
        pullOutCollection={pullOutCollection}
        deleteCollection={deleteCollection}
      />
      <Grid sx={{ height: '100%' }} container>
        <Grid item lg={2.5} md={2.7} xs={12} sm={4}>
          <Sidebar>
            <StyledListItemButton
              onClick={() => {
                if (!collectionThemes) getCollectionThemes();

                setOpenForm(true);
              }}
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
              <ListItemText primary={language.userPage.createCollection} />
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
                if (collectionsEdit.length === 0) return;
                if (!collectionThemes) getCollectionThemes();

                setOpenModalEdit(true);
              }}
            >
              <ListItemIcon>
                <Badge badgeContent={collectionsEdit.length} color="warning">
                  <EditIcon color="secondary" />
                </Badge>
              </ListItemIcon>
              <ListItemText primary={language.userPage.edit} />
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
                if (collectionsDel.length === 0) return;

                setOpenModalDelete(true);
              }}
            >
              <ListItemIcon>
                <Badge badgeContent={collectionsDel.length} color="error">
                  <DeleteIcon color="secondary" />
                </Badge>
              </ListItemIcon>
              <ListItemText primary={language.userPage.delete} />
            </StyledListItemButton>
          </Sidebar>
        </Grid>
        <Grid item lg={9.5} md={9.3} xs={12} sm={8}>
          {!!collections.collections?.length && (
            <Slider
              type="private"
              id={id}
              setEditCollection={setEditCollection}
              setDeleteCollection={setDeleteCollection}
              collections={collections}
              setCollection={setTargetCollection}
              getUserCollections={getMyCollections}
            />
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default UserPage;
