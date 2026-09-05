import React, { FC, useEffect, useState } from 'react';
import {
  Box,
  ListItem,
  List,
  ListSubheader,
  Button,
  Typography,
  TextField,
  Chip,
  alpha,
  IconButton,
  CardMedia,
} from '@mui/material';
import { makeStyles, Backdrop, Paper } from '@material-ui/core';
import { FormikProvider, useFormik } from 'formik';
import moment from 'moment';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import InputFile from '../../shared/components/InputFile/InputFile';
import { CustomFieldType, IconValue, ItemType, ItemUpdateType, MatchTagType } from '../../types';
import CustomField from '../CustomField/CustomField';
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
    maxHeight: '80vh',

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

interface IModalEditItem {
  openModal: boolean;
  setOpen: (state: boolean) => void;
  itemsEdit: Array<ItemType | null>;
  updateItem: (item: ItemUpdateType) => void;
  customFields: CustomFieldType[] | null;
  searchMatchTags: (tag: string) => void;
  matchTags: MatchTagType[] | null;
}

const ModalEditItem: FC<IModalEditItem> = ({
  openModal,
  setOpen,
  itemsEdit,
  updateItem,
  customFields,
  searchMatchTags,
  matchTags,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<IconValue>();
  const [itemId, setItemId] = useState<number>(0);

  const { language } = useLanguage();

  const classes = useStyles();

  const handleDelete = (str: string) => {
    setTags(tags.filter((tag) => tag !== str));
  };

  function getInitFields(fields: CustomFieldType[] | null) {
    let obj: Record<string, string> = {};

    fields?.forEach((customField) => {
      const [key] = Object.keys(customField);
      obj = {
        ...obj,
        [key]: '',
      };
    });

    return obj;
  }

  useEffect(() => {
    if (!itemsEdit.length) setOpen(false);
  }, [itemsEdit]);

  function handleSetTag(formik: { values: { tags: string } }) {
    if (formik.values.tags.trim()) {
      searchMatchTags(formik.values.tags);
    }
  }

  function handlePushTag(formik: { values: { tags: string } }) {
    if (!formik.values.tags.trim()) return;

    setTags([
      ...tags.filter((tag) => tag !== formik.values.tags),
      formik.values.tags,
    ]);
    formik.values.tags = '';
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      tags: '',
      ...getInitFields(customFields),
    },
    onSubmit: (values, { resetForm }) => {
      updateItem({
        itemId,
        icon: image || null,
        ...values,
        tags,
      });

      setTags([]);

      resetForm({
        values: {
          title: '',
          tags: '',
          ...getInitFields(customFields),
        },
      });

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
          <FormikProvider value={formik}>
            <form encType="multipart/form-data" onSubmit={formik.handleSubmit}>
              {itemsEdit?.map(
                (item: ItemType | null) => item && (
                <ListItem
                  key={item.id}
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
                    <Typography variant="h4">{item.title}</Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ marginRight: '3.4rem' }}
                    >
                      {language.modalEditItem.created}
                      {' '}
                      {moment(item.createdAt).format('DD/MM/YYYY')}
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
                          {formik.values.title || item.title}
                        </Typography>
                        <Box>
                          <IconButton
                            onClick={() => {
                              formik.resetForm({
                                values: { ...formik.values, title: '' },
                              });
                            }}
                          >
                            <CleaningServicesIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <TextField
                        name="title"
                        fullWidth
                        label={language.modalEditItem.title}
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
                        <Box>
                          <IconButton
                            onClick={() => {
                              setImage(null);
                            }}
                          >
                            <CleaningServicesIcon />
                          </IconButton>
                        </Box>
                      </Box>
                      <InputFile setImage={setImage} image={image} />
                      {item.icon && !image && (
                      <CardMedia
                        component="img"
                        height="194"
                        image={`data:application/pdf;base64,${item.icon}`}
                        alt={item.title}
                      />
                      )}
                    </Box>
                    <Box>
                      <TextField
                        fullWidth
                        name="tags"
                        label={language.modalEditItem.tags}
                        value={formik.values.tags}
                        onChange={formik.handleChange}
                        onKeyDown={() => handleSetTag(formik)}
                        error={
                              formik.touched.tags && Boolean(formik.errors.tags)
                            }
                        helperText={
                              formik.touched.tags && formik.errors.tags
                            }
                        InputProps={{
                          startAdornment: tags.map((tag, idx) => (
                            <Chip
                                  // eslint-disable-next-line react/no-array-index-key
                              key={idx}
                              label={tag}
                              onDelete={() => handleDelete(tag)}
                            />
                          )),
                        }}
                      />
                      <Button
                        fullWidth
                        onClick={() => handlePushTag(formik)}
                      >
                        {language.modalEditItem.enterBtn}
                      </Button>
                    </Box>
                    <Box>
                      <Box>
                        {matchTags?.map(
                          (matchTag: MatchTagType, idx: number) => (
                            <Chip
                                  // eslint-disable-next-line react/no-array-index-key
                              key={idx}
                              sx={{
                                marginRight: '.3rem',
                              }}
                              label={matchTag.content}
                              onClick={() => {
                                setTags([
                                  ...tags.filter(
                                    (tag) => matchTag.content !== tag,
                                  ),
                                  matchTag.content,
                                ]);

                                formik.values.tags = '';
                              }}
                            />
                          ),
                        )}
                      </Box>
                    </Box>
                    <Box>
                      {customFields
                            && customFields.map((field, idx: number) => (
                              <CustomField
                                typeField="update"
                                // eslint-disable-next-line react/no-array-index-key
                                key={idx}
                                formik={formik}
                                field={field}
                              />
                            ))}
                    </Box>
                  </Box>
                  <Box className={classes.action}>
                    <Button
                      sx={{
                        flex: 1,
                      }}
                      onClick={() => {
                        setItemId(item.id);
                        formik.handleSubmit();
                      }}
                      color="warning"
                    >
                      {language.modalEditItem.update}
                    </Button>
                    <Button
                      sx={{
                        flex: 1,
                      }}
                      type="reset"
                      color="warning"
                      onClick={formik.handleReset}
                    >
                      {language.modalEditItem.reset}
                    </Button>
                  </Box>
                </ListItem>
                ),
              )}
            </form>
          </FormikProvider>
        </List>
      </Paper>
    </Backdrop>
  );
};

export default ModalEditItem;
