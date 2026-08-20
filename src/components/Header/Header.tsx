import React, { FC, useState } from 'react';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
  Typography,
  Link,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import InsertCommentSharpIcon from '@mui/icons-material/InsertCommentSharp';
import Logo from '../Logo/Logo';
import RoutesApp from '../../constants/routes';
import InputSearch from '../InputSearch/InputSearch';
import { UntouchedCommentType } from '../../types';
import Toggle from '../Toggle/Toggle';
import ToggleLanguage from '../ToggleLanguage/ToggleLanguage';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: 'fixed',
  zIndex: theme.zIndex.drawer + 1,
  top: 0,
  left: 0,
  backgroundColor: theme.palette.common.white,
  paddingRight: '1.4rem',
  height: '3.2rem',
  overflowX: 'auto',

  '& .MuiToolbar-root': {
    minHeight: '3.2rem',
    maxHeight: '3.2rem',
    height: '3.2rem',
  },
}));

interface IHeader {
  name: string;
  surname: string;
  role: 'Admin' | 'User' | 'Reader' | null;
  search: (substr: string) => void;
  itemsSearch:
  | {
    link: string;
    id: number;
    routeId: number;
    icons: string[];
  }[]
  | undefined;
  usersSearch:
  | {
    link: string;
    id: number;
    routeId: number;
    icons: string[];
  }[]
  | undefined;
  clearSearchData: () => void;
  setSearchList: () => void;
  untouchedComments: UntouchedCommentType[] | null;
}

const Header: FC<IHeader> = ({
  name,
  surname,
  role,
  untouchedComments,
  ...rest
}) => {
  const [open, setOpen] = useState(false);

  const anchorRef = React.useRef<HTMLButtonElement>(null);

  const { CollectionLink: collection, ItemLink } = RoutesApp;

  function getCountUntouchedComments(data: UntouchedCommentType[]) {
    let count = 0;

    data.forEach((info) => {
      count += info.comments.length;
    });

    return count;
  }

  return (
    <StyledAppBar>
      <Toolbar
        sx={{
          justifyContent: 'space-around',
          columnGap: '2rem',
          minWidth: '600px',
        }}
      >
        {(role === 'Admin' || role === 'User') && name ? (
          <Logo name={name} role={role} surname={surname} />
        ) : (
          <Link component={RouterLink} to={RoutesApp.Login}>
            Login
          </Link>
        )}
        <InputSearch {...rest} />
        <Toggle />
        <ToggleLanguage />
        {!!untouchedComments?.length && (
          <>
            <IconButton
              size="large"
              onClick={() => setOpen(true)}
              ref={anchorRef}
            >
              <Badge
                badgeContent={getCountUntouchedComments(untouchedComments)}
                color="error"
              >
                <InsertCommentSharpIcon />
              </Badge>
            </IconButton>
            <Popper
              open={open}
              placement="bottom-start"
              transition
              disablePortal
              anchorEl={anchorRef.current}
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom-start' ? 'left top' : 'left bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={() => setOpen(false)}>
                      <MenuList
                        sx={{ p: 0 }}
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                      >
                        {untouchedComments.map((info) => (
                          <MenuItem
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              columnGap: '0.7rem',
                              height: '4.5rem',
                            }}
                          >
                            <Link
                              component={RouterLink}
                              // eslint-disable-next-line max-len
                              to={`${collection}${info.collectionId}${ItemLink}${info.itemId}`}
                            >
                              <Typography variant="body2">
                                {info.icon && (
                                  <Avatar
                                    alt={info.title}
                                    src={`data:application/pdf;base64,${info.icon}`}
                                  />
                                )}
                                {info.title}
                                {' '}
                              </Typography>
                              <Typography variant="subtitle2">
                                comments...
                              </Typography>
                            </Link>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </>
        )}
        <Box sx={{ flexGrow: '2rem' }} />
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
