import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    position: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1.4rem',
    top: '50%',
    left: '50%',
    width: '500px',
    transform: 'translate(-50%, -50%)',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
    },
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '1rem',
    maxWidth: '500px',
    width: '100%',
  },
  link: {
    position: 'relative',
    zIndex: 2,
  },
  action: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
