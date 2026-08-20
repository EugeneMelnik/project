/* eslint-disable consistent-return */
import React, { FC, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  gridClasses,
  getGridDateOperators,
  getGridStringOperators,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import { MdOutlineChangeCircle } from 'react-icons/md';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { ItemType } from '../../types';
import RoutesApp from '../../constants/routes';
import {
  compareCountTagsComparator,
  operatorContains,
  operatorIs,
  operatorBefore,
  operatorAfter,
  operatorEquals,
  operatorExistTag,
  operatorIsEmpty,
  operatorIsNotEmpty,
  operatorStartsWith,
  likesComparator,
} from '../../filters/filters';
import { useLanguage } from '../../context/LanguageContext';

interface ITable {
  collectionId: number;
  userId: number;
  list: ItemType[] | null;
  authorId: number;
  setTargetItem: (item: ItemType) => void;
  setEditItems: (itemIds: number[]) => void;
  setDeleteItems: (itemIds: number[]) => void;
  toggleLike: (userId: number, itemId: number) => void;
  likes: { itemId: number }[] | null;
  getCollectionItems: (collectionId: number) => void;
  customFields: any;
}

const ODD_OPACITY = 0.2;

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY
            + theme.palette.action.selectedOpacity
            + theme.palette.action.hoverOpacity,
        ),
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

const CustomToolbar = () => (
  <GridToolbarContainer>
    <GridToolbarExport />
  </GridToolbarContainer>
);

const Table: FC<ITable> = ({
  collectionId,
  list,
  setTargetItem,
  setEditItems,
  setDeleteItems,
  toggleLike,
  userId,
  likes,
  getCollectionItems,
  customFields,
  authorId,
}) => {
  const [selectRows, setSelectRows] = useState([]);

  const { CollectionLink, ItemLink } = RoutesApp;

  const { language } = useLanguage();

  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: language.collectionPage.title,
      flex: 1,
      minWidth: 150,
      valueGetter: (params) => params.row.title,
      renderCell: (params) => (
        <Link
          component={RouterLink}
          onClick={() => setTargetItem(params.row)}
          to={`${CollectionLink}${params.row.collectionId}${ItemLink}${params.row.id}`}
          sx={{
            display: 'flex',
            columnGap: '1.4rem',
            alignItems: 'center',
          }}
        >
          {params.row.icon && (
            <Avatar src={`data:application/pdf;base64,${params.row.icon}`} />
          )}
          <Typography variant="body2">{params.row.title}</Typography>
        </Link>
      ),
      filterOperators: getGridStringOperators()
        .filter(
          (operator) => operator.value === 'contains'
            || operator.value === 'equals'
            || operator.value === 'startsWith',
        )
        .map((operator) => {
          if (operator.value === 'equals') {
            return operatorEquals;
          }

          if (operator.value === 'contains') {
            return operatorContains;
          }

          if (operator.value === 'startsWith') {
            return operatorStartsWith;
          }

          return operator;
        }),
    },
    {
      field: 'tags',
      headerName: language.collectionPage.tags,
      type: 'string',
      valueGetter: (params) => params.row.tags
        ?.map((tag: { content: string }) => tag.content)
        .join(','),
      sortComparator: compareCountTagsComparator,
      minWidth: 150,
      flex: 1,
      renderCell: (params) => params.row.tags?.map((tag: any) => <Chip label={tag.content} />),
      filterOperators: getGridStringOperators()
        .filter((operator) => operator.value === 'contains')
        .map(() => operatorExistTag),
    },
    {
      field: 'likes',
      headerName: language.collectionPage.likes,
      type: 'number',
      valueGetter: (params) => params.row.likes?.length,
      width: 100,
      sortComparator: likesComparator,
      renderCell: (params) => params.row.likes && params.row.likes?.length,
      filterable: false,
    },
    {
      field: 'textValue1',
      headerName: customFields[12].textKey1
        ? customFields[12].textKey1
        : 'none',
      type: 'string',
      width: 100,
      renderCell: (params) => params.row.textValue1,
      filterOperators: getGridStringOperators()
        .filter(
          (operator) => operator.value === 'contains'
            || operator.value === 'equals'
            || operator.value === 'startsWith'
            || operator.value === 'isEmpty'
            || operator.value === 'isNotEmpty',
        )
        .map((operator) => {
          if (operator.value === 'equals') {
            return operatorEquals;
          }

          if (operator.value === 'contains') {
            return operatorContains;
          }

          if (operator.value === 'startsWith') {
            return operatorStartsWith;
          }

          if (operator.value === 'isEmpty') {
            return operatorIsEmpty;
          }

          if (operator.value === 'isNotEmpty') {
            return operatorIsNotEmpty;
          }

          return operator;
        }),
    },
    {
      field: 'textValue2',
      headerName: customFields[13].textKey2
        ? customFields[13].textKey2
        : 'none',
      type: 'string',
      width: 100,
      renderCell: (params) => params.row.textValue2,
      filterOperators: getGridStringOperators()
        .filter(
          (operator) => operator.value === 'contains'
            || operator.value === 'equals'
            || operator.value === 'startsWith'
            || operator.value === 'isEmpty'
            || operator.value === 'isNotEmpty',
        )
        .map((operator) => {
          if (operator.value === 'equals') {
            return operatorEquals;
          }

          if (operator.value === 'contains') {
            return operatorContains;
          }

          if (operator.value === 'startsWith') {
            return operatorStartsWith;
          }

          if (operator.value === 'isEmpty') {
            return operatorIsEmpty;
          }

          if (operator.value === 'isNotEmpty') {
            return operatorIsNotEmpty;
          }

          return operator;
        }),
    },
    {
      field: 'textValue3',
      headerName: customFields[14].textKey3
        ? customFields[14].textKey3
        : 'none',
      type: 'string',
      width: 100,
      renderCell: (params) => params.row.textValue3,
      filterOperators: getGridStringOperators()
        .filter(
          (operator) => operator.value === 'contains'
            || operator.value === 'equals'
            || operator.value === 'startsWith'
            || operator.value === 'isEmpty'
            || operator.value === 'isNotEmpty',
        )
        .map((operator) => {
          if (operator.value === 'equals') {
            return operatorEquals;
          }

          if (operator.value === 'contains') {
            return operatorContains;
          }

          if (operator.value === 'startsWith') {
            return operatorStartsWith;
          }

          if (operator.value === 'isEmpty') {
            return operatorIsEmpty;
          }

          if (operator.value === 'isNotEmpty') {
            return operatorIsNotEmpty;
          }

          return operator;
        }),
    },
    {
      field: 'dateValue1',
      headerName: customFields[3].dateKey1 ? customFields[3].dateKey1 : 'none',
      type: 'date',
      width: 100,
      renderCell: (params) => params.row.dateValue1,
      filterOperators: getGridDateOperators()
        .filter(
          (operator) => operator.value === 'is'
            || operator.value === 'after'
            || operator.value === 'before'
            || operator.value === 'isEmpty'
            || operator.value === 'isNotEmpty',
        )
        .map((operator) => {
          if (operator.value === 'is') {
            return operatorIs;
          }

          if (operator.value === 'after') {
            return operatorAfter;
          }

          if (operator.value === 'before') {
            return operatorBefore;
          }

          if (operator.value === 'isEmpty') {
            return operatorIsEmpty;
          }

          if (operator.value === 'isNotEmpty') {
            return operatorIsNotEmpty;
          }

          return operator;
        }),
    },
    {
      field: 'dateValue2',
      headerName: customFields[4].dateKey2 ? customFields[4].dateKey2 : 'none',
      type: 'date',
      width: 100,
      renderCell: (params) => params.row.dateValue2,
      filterOperators: getGridDateOperators()
        .filter(
          (operator) => operator.value === 'is'
            || operator.value === 'after'
            || operator.value === 'before'
            || operator.value === 'isEmpty'
            || operator.value === 'isNotEmpty',
        )
        .map((operator) => {
          if (operator.value === 'is') {
            return operatorIs;
          }

          if (operator.value === 'after') {
            return operatorAfter;
          }

          if (operator.value === 'before') {
            return operatorBefore;
          }

          if (operator.value === 'isEmpty') {
            return operatorIsEmpty;
          }

          if (operator.value === 'isNotEmpty') {
            return operatorIsNotEmpty;
          }

          return operator;
        }),
    },
    {
      field: 'dateValue3',
      headerName: customFields[5].dateKey3 ? customFields[5].dateKey3 : 'none',
      type: 'date',
      width: 100,
      renderCell: (params) => params.row.dateValue3,
      filterOperators: getGridDateOperators()
        .filter(
          (operator) => operator.value === 'is'
            || operator.value === 'after'
            || operator.value === 'before'
            || operator.value === 'isEmpty'
            || operator.value === 'isNotEmpty',
        )
        .map((operator) => {
          if (operator.value === 'is') {
            return operatorIs;
          }

          if (operator.value === 'after') {
            return operatorAfter;
          }

          if (operator.value === 'before') {
            return operatorBefore;
          }

          if (operator.value === 'isEmpty') {
            return operatorIsEmpty;
          }

          if (operator.value === 'isNotEmpty') {
            return operatorIsNotEmpty;
          }

          return operator;
        }),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      filterable: false,
      renderCell: (params) => (
        <>
          {authorId === userId && (
            <>
              <IconButton onClick={() => setEditItems([params.row.id])}>
                <MdOutlineChangeCircle />
              </IconButton>
              <IconButton onClick={() => setDeleteItems([params.row.id])}>
                <DeleteIcon />
              </IconButton>
            </>
          )}

          <Checkbox
            checked={!!likes?.find((like) => like.itemId === params.row.id)}
            color="error"
            icon={<FavoriteBorder color="error" />}
            checkedIcon={<Favorite color="error" />}
            onChange={() => {
              if (userId && params.row.id) {
                toggleLike(userId, params.row.id);
              }
            }}
          />
        </>
      ),
    },
  ];

  function handleChangeStateTable(e: any) {
    setSelectRows(e.selection);
  }

  return (
    <Box sx={{ position: 'relative', paddingTop: '1.4rem' }}>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.down('md')]: {
            display: 'flex',
            flexDirection: 'column',
          },
        })}
      >
        <Button
          onClick={() => getCollectionItems(collectionId)}
          color="secondary"
        >
          {language.collectionPage.filterCleaning}
        </Button>
        {authorId === userId && (
          <>
            <Button
              onClick={() => setDeleteItems(selectRows)}
              color="error"
              disabled={selectRows.length === 0}
            >
              {language.collectionPage.putDelete}
            </Button>
            <Button
              onClick={() => setEditItems(selectRows)}
              disabled={selectRows.length === 0}
              color="warning"
            >
              {language.collectionPage.putEdit}
            </Button>
          </>
        )}
      </Box>
      {customFields && list && (
        <StyledDataGrid
          autoHeight
          rows={list}
          getRowClassName={(params) => {
            const { indexRelativeToCurrentPage } = params;

            return indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd';
          }}
          components={{
            Toolbar: CustomToolbar,
          }}
          columns={columns}
          disableColumnSelector
          initialState={{
            columns: {
              columnVisibilityModel: {
                dateValue1: !!customFields[3].dateKey1,
                dateValue2: !!customFields[4].dateKey2,
                dateValue3: !!customFields[5].dateKey3,
                textValue1: !!customFields[12].textKey1,
                textValue2: !!customFields[13].textKey2,
                textValue3: !!customFields[14].textKey3,
              },
            },
          }}
          disableExtendRowFullWidth
          checkboxSelection
          onStateChange={handleChangeStateTable}
          disableSelectionOnClick
        />
      )}
    </Box>
  );
};

export default Table;
