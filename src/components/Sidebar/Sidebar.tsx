import React, { FC } from 'react';
import { Box } from '@mui/material';

interface ISidebar {
  children: JSX.Element[] | JSX.Element;
}

const Sidebar: FC<ISidebar> = ({ children }) => (
  <Box
    sx={(theme) => ({
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        justifyContent: 'space-between',
      },
    })}
  >
    {children}
  </Box>
);

export default Sidebar;
