import React, { FC, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import { makeStyles } from '@material-ui/core';
import { Avatar, Box, Link } from '@mui/material';
import { BsSearch } from 'react-icons/bs';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import AvatarGroup from '@mui/material/AvatarGroup';
import RoutesApp from '../../constants/routes';
import { useLanguage } from '../../context/LanguageContext';

const StyledTextField = styled(TextField)(({ theme }) => ({
  height: '100%',
  paddingLeft: '0.7rem',
  position: 'relative',
  borderBottom: `1px solid ${theme.palette.primary.dark}`,
}));

interface IInputSearch {
  search: (substr: string) => void;
  itemsSearch:
  | {
    link: string;
    id: number;
    routeId: number;
    icons: string[] | null;
  }[]
  | undefined;
  usersSearch:
  | {
    link: string;
    id: number;
    routeId: number;
    icons: string[] | null;
  }[]
  | undefined;
  clearSearchData: () => void;
  setSearchList: () => void;
}

const useStyles = makeStyles({
  wrap: {
    alignSelf: 'stretch',
    position: 'relative',
    justifyContent: 'space-between',
    '& .MuiFormControl-root': {
      justifyContent: 'center !important',
    },
    maxWidth: '600px',
  },
  icon: {
    position: 'absolute',
    right: '0.5rem',
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.7rem',
    columnGap: '1.4rem',
  },
});

const InputSearch: FC<IInputSearch> = ({
  search,
  itemsSearch,
  usersSearch,
  clearSearchData,
  setSearchList,
}) => {
  const [open, setOpen] = useState(false);
  const [substr, setSubstr] = useState<string>('');
  const [loading, setIsLoading] = useState<boolean>(false);

  const { language } = useLanguage();

  const navigate = useNavigate();

  const classes = useStyles();

  function searchWithDelay(
    callback: (substr: string) => void,
    substr: string,
    delay = 300,
  ) {
    setTimeout(() => {
      callback(substr);
      setIsLoading(false);
    }, delay);
  }

  useEffect(() => {
    if (substr) {
      setIsLoading(true);
      searchWithDelay(search, substr);
    }
  }, [substr]);

  return (
    <Autocomplete
      popupIcon={null}
      options={
        itemsSearch
        || usersSearch || [
          {
            link: '',
            id: 0,
            routeId: 0,
            icons: [''],
          },
        ]
      }
      id="asynchronous-demo"
      sx={{ flex: 1 }}
      open={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && substr.trim()) {
          setSearchList();

          navigate(RoutesApp.Search);
        }
      }}
      className={classes.wrap}
      getOptionLabel={(option) => option.link}
      renderOption={() => (itemsSearch
        ? itemsSearch?.map(
          (option) => !!option.id && (
            <Box className={classes.link}>
              {!!option.icons?.length && (
              <AvatarGroup max={4}>
                {option.icons.map((icon) => (
                  <Avatar
                    alt="Remy Sharp"
                    src={`data:application/pdf;base64,${icon}`}
                  />
                ))}
              </AvatarGroup>
              )}
              <Link
                component={RouterLink}
                      // eslint-disable-next-line max-len
                to={`${RoutesApp.CollectionLink}${option.routeId}${RoutesApp.ItemLink}${option.id}`}
                style={{
                  display: 'block',
                }}
              >
                {option.link}
              </Link>
            </Box>
          ),
        )
        : usersSearch?.map(
          (option) => !!option.id && (
            <Box className={classes.link}>
              {!!option.icons?.length && (
              <AvatarGroup max={4}>
                {option.icons.map((icon, idx: any) => (
                  <Avatar
                    id={idx}
                    alt="Remy Sharp"
                    src={`data:application/pdf;base64,${icon}`}
                  />
                ))}
              </AvatarGroup>
              )}
              <Link
                component={RouterLink}
                to={`${RoutesApp.CollectionsLink}user/${option.routeId}`}
                style={{
                  display: 'block',
                }}
              >
                {option.link}
              </Link>
            </Box>
          ),
        ))}
      loading={loading}
      onBlur={() => {
        setOpen(false);
        clearSearchData();
      }}
      renderInput={(params) => (
        <StyledTextField
          {...params}
          placeholder={language.search}
          onChange={(e: any) => {
            setOpen(true);
            setSubstr(e.target.value);
          }}
          variant="standard"
          fullWidth
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            style: { fontSize: '1.5rem' },
            endAdornment: (
              <Box className={classes.icon}>
                {loading ? (
                  <CircularProgress color="inherit" size="1.4rem" />
                ) : (
                  <BsSearch size="1.4rem" />
                )}
              </Box>
            ),
          }}
        />
      )}
    />
  );
};

export default InputSearch;
