import { Backdrop } from '@mui/material';
import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface IPreloader {
  isLoading: boolean;
}

const Preloader: FC<IPreloader> = ({ isLoading }) => (
  <Backdrop
    invisible
    sx={{
      zIndex: 9999,
    }}
    open={isLoading}
  >
    <CircularProgress color="primary" />
  </Backdrop>
);

export default Preloader;
