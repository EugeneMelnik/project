import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

export const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(5px)',
    '&.Mui-checked': {
      transform: 'translateX(23px)',
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.primary.light,
    width: 32,
    height: 32,
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.primary.dark,
    borderRadius: 20 / 2,
  },
}));
