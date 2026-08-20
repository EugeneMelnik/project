import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core';
import {
  Box, Button, CardMedia, Input,
} from '@mui/material';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useLanguage } from '../../../context/LanguageContext';

const useStyles = makeStyles({
  file: {
    width: '100%',
    opacity: 0,
    height: '2rem',
    zIndex: 2,
    display: 'block',
  },
  ready: {
    position: 'relative',
    transform: 'translateY(-100%)',
    height: '2rem',
  },
  title: {
    position: 'relative',
    transform: 'translateY(-100%)',
    height: '2rem',
  },
});

interface IInputFile {
  image: any;
  setImage: (image: any) => void;
}

const InputFile: FC<IInputFile> = ({ image, setImage }) => {
  const classes = useStyles();

  const { language } = useLanguage();

  return (
    <Box>
      <Input
        id="icon"
        name="icon"
        inputProps={{ accept: 'image/*' }}
        className={classes.file}
        type="file"
        onChange={(e: any) => {
          setImage(e.target.files[0]);
        }}
      />
      {image ? (
        <Button fullWidth className={classes.ready}>
          <FileDownloadDoneIcon />
          {language.modalCreateCollection.ready}
        </Button>
      ) : (
        <Button fullWidth className={classes.title}>
          <FileDownloadIcon />
          {language.modalCreateCollection.addPhoto}
        </Button>
      )}
      {image && (
        <CardMedia
          component="img"
          image={URL.createObjectURL(image)}
          alt="download"
          height="190"
        />
      )}
    </Box>
  );
};

export default InputFile;
