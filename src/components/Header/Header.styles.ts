import { styled } from '@mui/material/styles';
import { AppBar } from '@mui/material';

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  zIndex: theme.zIndex.drawer + 1,
  top: 0,
  left: 0,
  backgroundColor: theme.palette.common.white,
  paddingRight: '1.4rem',
  paddingTop: '0.1rem',
  paddingBottom: '0.1rem',
  overflowX: 'auto',

  '& .MuiToolbar-root': {
    minHeight: '3.2rem',
    maxHeight: '3.2rem',
    height: '3.2rem',
  },
}));
