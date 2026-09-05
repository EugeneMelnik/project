import React, { FC } from 'react';
import {
  Box,
  Chip,
  Grid,
  Link,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteIcon from '@mui/icons-material/Delete';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Link as RouterLink } from 'react-router-dom';
import { CollectionType, TargetUserType } from '../../types';
import Slider from '../../components/Slider/Slider';
import { useLanguage } from '../../context/LanguageContext';
import RoutesApp from '../../constants/routes';

interface IAdminPage {
  targetCollections: {
    countCollections: number;
    collections: CollectionType[] | null;
  };
  targetUser: TargetUserType | null;
  getTargetUser: (id: number) => void;
  getTargetUserCollections: (id: number, page?: number) => void;
  users: TargetUserType[] | null;
  setCollection: (collectionId: CollectionType) => void;
  blockUser: (userId: number) => void;
  unblockUser: (userId: number) => void;
  deleteUser: (userId: number) => void;
  setIsAdmin: (userId: number) => void;
  setIsNotAdmin: (userId: number) => void;
  setUserId: (userId: number) => void;
}

const AdminPage: FC<IAdminPage> = ({
  targetCollections,
  targetUser,
  users,
  getTargetUser,
  setCollection,
  getTargetUserCollections,
  blockUser,
  unblockUser,
  deleteUser,
  setIsAdmin,
  setIsNotAdmin,
  setUserId,
}) => {
  const { language } = useLanguage();

  return (
    <Grid container direction="row">
      <Grid item lg={2.5} md={2.7} xs={12} sm={3}>
        <ListItemButton
          onClick={() => {
            if (targetUser) blockUser(targetUser.id);
          }}
        >
          <ListItemIcon>
            <BlockIcon />
          </ListItemIcon>
          <ListItemText primary={language.adminPage.block} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            if (targetUser) unblockUser(targetUser.id);
          }}
        >
          <ListItemIcon>
            <LockOpenIcon />
          </ListItemIcon>
          <ListItemText primary={language.adminPage.unblock} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            if (targetUser) setIsAdmin(targetUser.id);
          }}
        >
          <ListItemIcon>
            <EmojiEventsIcon />
          </ListItemIcon>
          <ListItemText primary={language.adminPage.makeAdmin} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            if (targetUser) setIsNotAdmin(targetUser.id);
          }}
        >
          <ListItemIcon>
            <SentimentVeryDissatisfiedIcon />
          </ListItemIcon>
          <ListItemText primary={language.adminPage.removeAdmin} />
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            if (targetUser) deleteUser(targetUser.id);
          }}
        >
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary={language.adminPage.delete} />
        </ListItemButton>
      </Grid>
      <Grid item lg={6.5} md={6.3} xs={12} sm={6}>
        {targetUser && (
          <Typography
            variant="h4"
            sx={{
              paddingBottom: '1.4rem',
            }}
          >
            {targetUser.name}
            {' '}
            {targetUser.surname}
          </Typography>
        )}
        {!!targetCollections.collections?.length && (
          <Box>
            <Slider
              id={1}
              getUserCollections={getTargetUserCollections}
              collections={targetCollections}
              setCollection={setCollection}
            />
          </Box>
        )}
      </Grid>
      <Grid item lg={3} md={3} sm={3} xs={12}>
        <Box>
          {users
            && users.map((user) => (
              <ListItemButton
                onClick={() => getTargetUser(user.id)}
                key={user.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                {user.name}
                {' '}
                {user.surname}
                <Link
                  component={RouterLink}
                  to={RoutesApp.User}
                  sx={{
                    position: 'relative',
                    zIndex: 2,
                  }}
                  onClick={() => {
                    setUserId(user.id);
                  }}
                >
                  <Chip
                    label="User page"
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                </Link>
                <Stack direction="row" spacing={1}>
                  <Chip
                    label={
                      user.status === 'active'
                        ? language.adminPage.active
                        : language.adminPage.blocked
                    }
                    color={user.status === 'active' ? 'primary' : 'error'}
                    size="small"
                  />
                  {user.role === 'Admin' && (
                    <Chip
                      label={language.adminPage.admin}
                      color="primary"
                      variant="outlined"
                      size="small"
                    />
                  )}
                </Stack>
              </ListItemButton>
            ))}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AdminPage;
