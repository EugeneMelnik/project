import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';

export const StyledChip = styled(Chip)(({ theme }) => ({
  position: 'relative',
  fontSize: '1.2rem',
  paddingLeft: '3rem',
  height: '2.8rem',
  borderRadius: '3rem',
  minWidth: '3rem',

  '& .MuiChip-label': {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));
