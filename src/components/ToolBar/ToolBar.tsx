import React, { FC, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import CollectionsIcon from '@mui/icons-material/Collections';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Drawer, Link } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RoutesApp from '../../constants/routes';
import { useTypedDispatch, useTypedSelector } from '../../redux';
import { logOutThunk } from '../../redux/actions/user-action';
import {
  userIdSelector,
  userRoleSelector,
} from '../../redux/selectors/user-selector';

const ToggleButton = styled(Button)(({ theme }) => ({
  position: 'fixed',
  zIndex: theme.zIndex.drawer + 1,
  top: 0,
  right: 0,
  fontSize: '2rem',
  backgroundColor: theme.palette.primary.dark,
  maxWidth: '3.2rem',
  maxHeight: '3.2rem',
  minWidth: '3.2rem',
  minHeight: '3.2rem',
}));

const LinkButton = styled(Button)({
  maxWidth: '3.2rem',
  maxHeight: '4.4rem',
  minWidth: '3.2rem',
  minHeight: '4.4rem',
});

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    zIndex: theme.zIndex.appBar - 1,
  },
  toolbar: {
    minHeight: '3.2rem',
  },
}));

const ToolBar: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const dispatch = useTypedDispatch();

  const userId = useTypedSelector(userIdSelector);
  const role = useTypedSelector(userRoleSelector);

  const classes = useStyles();

  function toggleDrawer() {
    setIsVisible(!isVisible);
  }

  async function handleLogout() {
    if (userId) await dispatch(logOutThunk(userId));
  }

  return (
    <Box>
      <ToggleButton onClick={toggleDrawer} variant="contained">
        <CloseIcon fontSize="large" />
      </ToggleButton>
      <Drawer
        className={classes.drawer}
        anchor="right"
        open={isVisible}
        onClose={toggleDrawer}
        variant="temporary"
      >
        <div className={classes.toolbar} />
        <Link component={RouterLink} to={RoutesApp.Home}>
          <LinkButton>
            <HomeIcon fontSize="large" />
          </LinkButton>
        </Link>
        {role && role !== 'Reader' && (
          <Link component={RouterLink} to={RoutesApp.Profile}>
            <LinkButton>
              <PersonIcon fontSize="large" />
            </LinkButton>
          </Link>
        )}
        <Link component={RouterLink} to={RoutesApp.CollectionsLink}>
          <LinkButton>
            <CollectionsIcon fontSize="large" />
          </LinkButton>
        </Link>
        {role === 'Admin' && (
          <Link component={RouterLink} to={RoutesApp.Admin}>
            <LinkButton aria-label="Administration">
              <AdminPanelSettingsIcon fontSize="large" />
            </LinkButton>
          </Link>
        )}
        {role && role !== 'Reader' && (
          <Link component={RouterLink} to={RoutesApp.Login}>
            <LinkButton onClick={handleLogout}>
              <LogoutIcon fontSize="large" />
            </LinkButton>
          </Link>
        )}
      </Drawer>
    </Box>
  );
};

export default ToolBar;
