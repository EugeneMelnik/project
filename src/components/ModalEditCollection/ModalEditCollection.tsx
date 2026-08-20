import React, { FC, useEffect, useState } from 'react';
import {
  Box,
  ListItem,
  List,
  ListSubheader,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  FormHelperText,
  Select,
  Typography,
  CardMedia,
  TextField,
  IconButton,
  alpha,
  Paper,
} from '@mui/material';
import { Backdrop, makeStyles } from '@material-ui/core';
import { FormikProvider, useFormik } from 'formik';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import MDEditor from '@uiw/react-md-editor';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import InputFile from '../../shared/components/InputFile/InputFile';
import { CollectionType } from '../../types';
import UpdateFormField from '../UpdateFormField/UpdateFormField';
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
    minWidth: '300px',
    height: '500px',

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
    width: '100%',
    flex: 1,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
    },

    '& > *': {
      display: 'flex',
      flexDirection: 'column',
      padding: '.7rem',
      backgroundColor: alpha(theme.palette.common.black, 0.05),

      '& .w-md-editor-toolbar': {
        [theme.breakpoints.down('sm')]: {
          '&  > *': {
            flex: 1,
          },

          '&  > *:last-child': {
            textAlign: 'end',
          },
        },
      },
      '& .wmde-markdown': {
        backgroundColor: 'transparent',
      },
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

interface IModalEditCollection {
  openModal: boolean;
  setOpen: (state: boolean) => void;
  collectionsEdit: Array<CollectionType | null>;
  updateCollection: (collection: any) => void;
  pullOutCollection: (collectionId: number) => void;
  collectionThemes: { id: number; value: string }[] | null;
}

const ModalEditCollection: FC<IModalEditCollection> = ({
  openModal,
  setOpen,
  collectionsEdit,
  updateCollection,
  pullOutCollection,
  collectionThemes,
}) => {
  const [image, setImage] = useState<any>();
  const [description, setDescription] = useState<any>('');
  const [collectionId, setCollectionId] = useState<any>('');

  const { language } = useLanguage();

  useEffect(() => {
    if (!collectionsEdit.length) setOpen(false);
  }, [collectionsEdit]);

  function handleResetForm(formik: any, fieldName: string) {
    formik.resetForm({
      values: { ...formik.values, [fieldName]: '' },
    });
  }

  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      title: '',
      theme: '',
      radioKey1: '',
      radioKey2: '',
      radioKey3: '',
      numberKey1: '',
      numberKey2: '',
      numberKey3: '',
      checkboxKey1: { field: '', count: 1, values: [''] },
      checkboxKey2: { field: '', count: 1, values: [''] },
      checkboxKey3: { field: '', count: 1, values: [''] },
      dateKey1: '',
      dateKey2: '',
      dateKey3: '',
      multiLineKey1: '',
      multiLineKey2: '',
      multiLineKey3: '',
      textKey1: '',
      textKey2: '',
      textKey3: '',
    },
    onSubmit: (values, { resetForm }) => {
      updateCollection({
        collectionId,
        icon: image || null,
        description: description.replace(/\n/gim, '&&#&&'),
        theme: values.theme,
        radioKey1: values.radioKey1 ? values.radioKey1 : null,
        radioKey2: values.radioKey2 ? values.radioKey2 : null,
        radioKey3: values.radioKey3 ? values.radioKey3 : null,
        numberKey1: values.numberKey1 ? values.numberKey1 : null,
        numberKey2: values.numberKey2 ? values.numberKey2 : null,
        numberKey3: values.numberKey3 ? values.numberKey3 : null,
        dateKey1: values.dateKey1 ? values.dateKey1 : null,
        dateKey2: values.dateKey2 ? values.dateKey2 : null,
        dateKey3: values.dateKey3 ? values.dateKey3 : null,
        multiLineKey1: values.multiLineKey1 ? values.multiLineKey1 : null,
        multiLineKey2: values.multiLineKey2 ? values.multiLineKey2 : null,
        multiLineKey3: values.multiLineKey3 ? values.multiLineKey3 : null,
        textKey1: values.textKey1 ? values.textKey1 : null,
        textKey2: values.textKey2 ? values.textKey2 : null,
        textKey3: values.textKey3 ? values.textKey3 : null,
        checkboxKey1:
          values.checkboxKey1.field && !!values.checkboxKey1.values[0]
            ? `${values.checkboxKey1.field}:${values.checkboxKey1.values.slice(
              0,
              values.checkboxKey1.count,
            )}`
            : null,
        checkboxKey2:
          values.checkboxKey2.field && !!values.checkboxKey2.values[0]
            ? `${values.checkboxKey2.field}:${values.checkboxKey2.values.slice(
              0,
              values.checkboxKey2.count,
            )}`
            : null,
        checkboxKey3:
          values.checkboxKey3.field && !!values.checkboxKey3.values[0]
            ? `${values.checkboxKey3.field}:${values.checkboxKey3.values.slice(
              0,
              values.checkboxKey3.count,
            )}`
            : null,
      });

      setDescription('');
      setImage('');

      resetForm({
        values: {
          title: '',
          theme: '',
          radioKey1: '',
          radioKey2: '',
          radioKey3: '',
          numberKey1: '',
          numberKey2: '',
          numberKey3: '',
          checkboxKey1: { field: '', count: 1, values: [''] },
          checkboxKey2: { field: '', count: 1, values: [''] },
          checkboxKey3: { field: '', count: 1, values: [''] },
          dateKey1: '',
          dateKey2: '',
          dateKey3: '',
          multiLineKey1: '',
          multiLineKey2: '',
          multiLineKey3: '',
          textKey1: '',
          textKey2: '',
          textKey3: '',
        },
      });

      pullOutCollection(collectionId);
    },
    onReset: () => {
      setImage('');
      setDescription('');
    },
  });

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
          {collectionsEdit?.map(
            (collection: any) => collection && (
            <FormikProvider key={collection.id} value={formik}>
              <form
                encType="multipart/form-data"
                onSubmit={formik.handleSubmit}
              >
                <ListItem
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    p: 0,
                  }}
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
                    <Typography variant="h4">{collection.title}</Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginRight: '3.4rem' }}
                    >
                      {language.modalEditCollection.created}
                      {' '}
                      {moment(collection.createdAt).format('DD/MM/YYYY')}
                    </Typography>
                  </ListSubheader>
                  <Box className={classes.listItem}>
                    <Box>
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography variant="body2">
                          {formik.values.title || collection.title}
                        </Typography>
                        <Box>
                          <IconButton
                            onClick={() => handleResetForm(formik, 'title')}
                          >
                            <CleaningServicesIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <TextField
                        name="title"
                        fullWidth
                        label={language.modalEditCollection.title}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={
                              formik.touched.title
                              && Boolean(formik.errors.title)
                            }
                        helperText={
                              formik.touched.title && formik.errors.title
                            }
                      />
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Typography variant="body2">
                          {formik.values.theme || collection.theme}
                        </Typography>
                        <Box>
                          <IconButton
                            onClick={() => handleResetForm(formik, 'theme')}
                          >
                            <CleaningServicesIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <FormControl
                        error={
                              !!formik.touched.theme && !!formik.errors.theme
                            }
                      >
                        <InputLabel>
                          {language.modalEditCollection.theme}
                        </InputLabel>
                        <Select
                          name="theme"
                          label={language.modalEditCollection.theme}
                          value={formik.values.theme}
                          onChange={formik.handleChange}
                          fullWidth
                          IconComponent={
                                collectionThemes
                                  ? KeyboardDoubleArrowDownIcon
                                  : HourglassTopIcon
                              }
                          error={
                                formik.touched.theme
                                && Boolean(formik.errors.theme)
                              }
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {collectionThemes
                                && collectionThemes.map(
                                  (theme: { value: string }) => (
                                    <MenuItem value={theme.value}>
                                      {theme.value}
                                    </MenuItem>
                                  ),
                                )}
                        </Select>
                        <FormHelperText>
                          {formik.touched.theme && formik.errors.theme}
                        </FormHelperText>
                      </FormControl>
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <MDEditor.Markdown
                          style={{
                            backgroundColor: 'transparent',
                          }}
                          source={
                                description
                                  ? description.replace(/&&#&&/gim, '\n')
                                  : collection.description.replace(
                                    /&&#&&/gim,
                                    '\n',
                                  )
                              }
                        />
                        <Box>
                          <IconButton onClick={() => setDescription('')}>
                            <CleaningServicesIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <MDEditor
                        style={{
                          backgroundColor: 'transparent',
                        }}
                        height={300}
                        textareaProps={{
                          placeholder:
                                language.modalEditCollection.description,
                        }}
                        value={description}
                        onChange={setDescription}
                      />
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Box>
                          <IconButton onClick={() => setImage(null)}>
                            <CleaningServicesIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <InputFile setImage={setImage} image={image} />
                      {collection.icon && !image && (
                      <CardMedia
                        component="img"
                        height="194"
                        image={`data:application/pdf;base64,${collection.icon}`}
                        alt={collection.title}
                      />
                      )}
                    </Box>
                    {Object.keys(collection).map(
                      (key, idx: any) => collection[key]
                            && ![
                              'isEdit',
                              'id',
                              'isDelete',
                              'createdAt',
                              'title',
                              'theme',
                              'icon',
                              'description',
                              'updatedAt',
                              'userId',
                            ].includes(key) && (
                              <UpdateFormField
                                // eslint-disable-next-line react/no-array-index-key
                                key={`${key}-${idx}`}
                                formik={formik}
                                value={collection[key]}
                                field={key}
                              />
                      ),
                    )}
                  </Box>
                  <Box className={classes.action}>
                    <Button
                      sx={{
                        flex: 1,
                      }}
                      onClick={() => {
                        setCollectionId(collection.id);
                        formik.handleSubmit();
                      }}
                      color="warning"
                    >
                      Update
                    </Button>
                    <Button
                      sx={{
                        flex: 1,
                      }}
                      type="reset"
                      color="warning"
                      onClick={formik.handleReset}
                    >
                      Reset
                    </Button>
                    <Button
                      sx={{
                        flex: 1,
                      }}
                      onClick={() => {
                        if (collection.id) {
                          pullOutCollection(collection.id);
                        }
                      }}
                    >
                      Pull out
                    </Button>
                  </Box>
                </ListItem>
              </form>
            </FormikProvider>
            ),
          )}
        </List>
      </Paper>
    </Backdrop>
  );
};

export default ModalEditCollection;
