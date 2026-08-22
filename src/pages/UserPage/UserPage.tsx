import React, { FC, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import CollectionForm from '../../components/CollectionForm/CollectionForm';
import Slider from '../../components/Slider/Slider';
import { CollectionInitType, CollectionType, CollectionUpdateType } from '../../types';
import ModalEditCollection from '../../components/ModalEditCollection/ModalEditCollection';
import ModalDelete from '../../components/ModalDelete/ModalDelete';
import { useLanguage } from '../../context/LanguageContext';

interface IUserPage {
  id: number;
  name: string;
  surname: string;
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
  updateCollection: (collection: CollectionUpdateType) => void;
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
  getMyCollections,
  getCollectionThemes,
  collectionThemes,
  id,
  name,
  surname,
}) => {
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);

  const { language } = useLanguage();

  useEffect(() => {
    if (collectionsEdit.length) setOpenModalEdit(true);
  }, [collectionsEdit]);

  const collectionsCount = collections.countCollections;
  const itemsCount = collections.collections?.reduce(
    (total, collection) => total + (collection.list?.length || 0),
    0,
  ) || 0;

  const openCollectionForm = () => {
    if (!collectionThemes) getCollectionThemes();

    setOpenForm(true);
  };

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
        collectionThemes={collectionThemes}
      />
      <ModalDelete
        openModal={openModalDelete}
        setOpen={setOpenModalDelete}
        collectionsDel={collectionsDel}
        deleteCollection={deleteCollection}
      />
      <Box sx={{ width: '100%', maxWidth: '1800px', mx: 'auto', px: { xs: 1, md: 3 }, py: 3 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
            mb: 3,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <PersonOutlineIcon color="secondary" sx={{ fontSize: 38 }} />
            <Box>
              <Typography variant="overline">{language.userPage.profile}</Typography>
              <Typography variant="h3" sx={{ lineHeight: 1.1 }}>
                {name} {surname}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={openCollectionForm}>
              {language.userPage.createCollection}
            </Button>
            <Button
              variant="outlined"
              startIcon={<EditIcon />}
              disabled={collectionsEdit.length === 0}
              onClick={() => {
                if (!collectionThemes) getCollectionThemes();
                setOpenModalEdit(true);
              }}
            >
              {language.userPage.edit}
              {' '}
              ({collectionsEdit.length})
            </Button>
            <Button
              color="error"
              variant="outlined"
              startIcon={<DeleteIcon />}
              disabled={collectionsDel.length === 0}
              onClick={() => setOpenModalDelete(true)}
            >
              {language.userPage.delete}
              {' '}
              ({collectionsDel.length})
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
            gap: 1.5,
            mb: 4,
          }}
        >
          {[
            { icon: CollectionsBookmarkOutlinedIcon, value: collectionsCount, label: language.userPage.collections },
            { icon: Inventory2OutlinedIcon, value: itemsCount, label: language.userPage.items },
            { icon: EditIcon, value: collectionsEdit.length, label: language.userPage.availableActions },
          ].map(({ icon: Icon, value, label }) => (
            <Paper key={label as string} variant="outlined" sx={{ p: 2, display: 'flex', gap: 1.5 }}>
              <Icon color="secondary" />
              <Box>
                <Typography variant="h4">{value}</Typography>
                <Typography variant="body2" color="text.secondary">{label}</Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        <Typography variant="h4" sx={{ mb: -2 }}>
          {language.userPage.myCollections}
        </Typography>
        {!!collections.collections?.length ? (
          <Slider
            type="private"
            id={id}
            setEditCollection={setEditCollection}
            setDeleteCollection={setDeleteCollection}
            collections={collections}
            setCollection={setTargetCollection}
            getUserCollections={getMyCollections}
          />
        ) : (
          <Paper variant="outlined" sx={{ mt: 3, p: { xs: 3, md: 5 }, textAlign: 'center' }}>
            <CollectionsBookmarkOutlinedIcon color="secondary" sx={{ fontSize: 44, mb: 1 }} />
            <Typography variant="h5">{language.userPage.noCollections}</Typography>
            <Button variant="contained" startIcon={<AddIcon />} onClick={openCollectionForm} sx={{ mt: 2 }}>
              {language.userPage.createCollection}
            </Button>
          </Paper>
        )}
      </Box>
    </>
  );
};

export default UserPage;
