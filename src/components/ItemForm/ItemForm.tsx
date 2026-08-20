/* eslint-disable react/no-array-index-key */
import React, { FC, useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { makeStyles } from '@material-ui/core';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import * as yup from 'yup';
import {
  Alert,
  Box,
  TextField,
  Button,
  Backdrop,
  Paper,
  Chip,
} from '@mui/material';
import CustomField from '../CustomField/CustomField';
import InputFile from '../../shared/components/InputFile/InputFile';

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
  form: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1.4rem',
    padding: '1.4rem',
    height: '300px',
    overflowY: 'scroll',

    [theme.breakpoints.down('sm')]: {
      height: '100%',
    },
  },
  paper: {
    position: 'relative',
    width: '60%',
    minWidth: '300px',
    borderRadius: 0,

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
    },
  },
}));

interface IItemForm {
  collectionId: number;
  openForm: boolean;
  setOpenForm: (state: boolean) => void;
  customFields: string[];
  createNewItem: (itemInfo: any) => void;
  searchMatchTags: (tag: string) => void;
  matchTags: any;
}

const ItemForm: FC<IItemForm> = ({
  openForm,
  setOpenForm,
  customFields,
  createNewItem,
  collectionId,
  searchMatchTags,
  matchTags,
}) => {
  const [tags, setTags] = useState<string[]>([]);
  const [image, setImage] = useState<any>();
  const [isSubmited, setIsSubmited] = useState(false);

  const classes = useStyles();

  function getInitFields(customFields: string[]) {
    let obj = {};

    customFields.forEach((customField: any) => {
      const [key] = Object.keys(customField);
      obj = {
        ...obj,
        [key]: '',
      };
    });

    return obj;
  }

  const validationSchema = yup.object({
    title: yup
      .string()
      .trim()
      .min(2, 'Title must have more than 2 letters')
      .max(150, 'Title must have less than 30 letters')
      .required('Title is required'),
  });

  const handleClose = () => {
    setOpenForm(false);
  };

  const handleDelete = (str: string) => {
    setTags(tags.filter((tag) => tag !== str));
  };

  function handleSetTag(formik: any) {
    if (formik.values.tags.trim()) {
      searchMatchTags(formik.values.tags);
    }
  }

  function handlePushTag(formik: any) {
    if (!formik.values.tags.trim()) return;

    setIsSubmited(false);
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
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (!tags.length) return;

      createNewItem({
        collectionId,
        icon: image,
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

      handleClose();
    },
    onReset: (values, { setValues }) => {
      setIsSubmited(false);
      setTags([]);
      setImage('');

      setValues({
        title: '',
        tags: '',
        ...getInitFields(customFields),
      });
    },
    enableReinitialize: true,
  });

  return (
    <Backdrop className={classes.back} open={openForm} invisible>
      <Paper className={classes.paper}>
        <StyledButton
          onClick={() => {
            formik.resetForm();
            setIsSubmited(false);
            handleClose();
          }}
          variant="contained"
        >
          <CloseIcon fontSize="large" />
        </StyledButton>
        <FormikProvider value={formik}>
          <form
            className={classes.form}
            onSubmit={(e: any) => {
              setIsSubmited(true);

              return formik.handleSubmit(e);
            }}
          >
            <TextField
              fullWidth
              id="title"
              name="title"
              label="Title"
              autoFocus
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <InputFile setImage={setImage} image={image} />
            <Box>
              <TextField
                fullWidth
                name="tags"
                label="Enter tags"
                value={formik.values.tags}
                onKeyDown={() => {
                  handleSetTag(formik);
                }}
                onChange={(e: any) => {
                  setIsSubmited(false);

                  formik.handleChange(e);
                }}
                InputProps={{
                  startAdornment: tags.map((tag, idx) => (
                    <Chip
                      key={idx}
                      style={{
                        marginRight: '0.3rem',
                      }}
                      label={tag}
                      onDelete={() => handleDelete(tag)}
                    />
                  )),
                }}
              />
              {isSubmited && <Alert severity="error">Tags is required</Alert>}
              {!isSubmited && (
                <Button fullWidth onClick={() => handlePushTag(formik)}>
                  Please press enter to add a new tag
                </Button>
              )}
            </Box>
            <Box>
              {matchTags?.map((matchTag: { content: string }, idx: any) => (
                <Chip
                  key={idx}
                  label={matchTag.content}
                  onClick={() => {
                    setTags([
                      ...tags.filter((tag) => matchTag.content !== tag),
                      matchTag.content,
                    ]);

                    formik.values.tags = '';
                  }}
                />
              ))}
            </Box>
            {customFields
              && customFields.map((field: any, index: any) => (
                <CustomField
                  typeField="create"
                  key={index}
                  field={field}
                  formik={formik}
                />
              ))}
            <Button
              color="primary"
              fullWidth
              type="button"
              onClick={() => formik.resetForm()}
            >
              Reset
            </Button>
            <Button variant="contained" fullWidth type="submit">
              Confirm
            </Button>
          </form>
        </FormikProvider>
      </Paper>
    </Backdrop>
  );
};

export default ItemForm;
