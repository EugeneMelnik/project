import React, { useState } from 'react';
import {
  GridComparatorFn,
  GridFilterOperator,
  GridCellParams,
  GridFilterItem,
  GridFilterInputValueProps,
} from '@mui/x-data-grid';
import { useParams } from 'react-router-dom';
import {
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  SelectChangeEvent,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatchType } from '../redux';
import type { ItemType } from '../types';
import CheckIcon from '@mui/icons-material/Check';
import {
  filterContainsThunk,
  filterEqualsThunk,
  filterExistTagThunk,
  filterIsEmptyThunk,
  filterIsNotEmptyThunk,
  filterLessThanThunk,
  filterMoreThanThunk,
  filterStartsWithThunk,
} from '../redux/actions/collection-action';
import { getCollectionListSelector } from '../redux/selectors/collection-selector';

export const inputTextValue = (props: GridFilterInputValueProps) => {
  const [value, setValue] = useState<string>('');
  const { item, focusElementRef } = props;
  // need to find another way
  const { collectionId } = useParams();

  const dispatch = useDispatch<AppDispatchType>();

  const elemRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(focusElementRef, () => ({
    focus: () => {
      elemRef.current?.focus();
    },
  }));

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!collectionId) return;

    if (item.operatorValue?.toLowerCase() === 'contains') {
      dispatch(
        filterContainsThunk(+collectionId, item.columnField, value),
      );
    }

    if (item.operatorValue?.toLowerCase() === 'equals') {
      dispatch(
        filterEqualsThunk(+collectionId, item.columnField, value),
      );
    }

    if (item.operatorValue?.toLowerCase() === 'starts with') {
      dispatch(
        filterStartsWithThunk(+collectionId, item.columnField, value),
      );
    }

    setValue('');
  }

  return (
    <form
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        paddingLeft: '1.4rem',
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        name="contains-operator"
        placeholder="Filter value"
        value={value}
        onChange={handleFilterChange}
        ref={elemRef}
      />
      <IconButton type="submit">
        <CheckIcon />
      </IconButton>
    </form>
  );
};

export const inputDateValue = (props: GridFilterInputValueProps) => {
  const [value, setValue] = useState<string>('');
  const { item, focusElementRef } = props;
  // need to find another way
  const { collectionId } = useParams();

  const dispatch = useDispatch<AppDispatchType>();

  const elemRef = React.useRef<HTMLInputElement>(null);
  React.useImperativeHandle(focusElementRef, () => ({
    focus: () => {
      elemRef.current?.focus();
    },
  }));

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!collectionId) return;

    if (item.operatorValue === 'after') {
      dispatch(
        filterMoreThanThunk(+collectionId, item.columnField, value),
      );
    }

    if (item.operatorValue === 'before') {
      dispatch(
        filterLessThanThunk(+collectionId, item.columnField, value),
      );
    }

    if (item.operatorValue?.toLowerCase() === 'is') {
      dispatch(
        filterEqualsThunk(+collectionId, item.columnField, value),
      );
    }

    if (item.operatorValue?.toLowerCase() === 'empty') {
      dispatch(filterIsEmptyThunk(+collectionId, item.columnField));
    }

    if (item.operatorValue?.toLowerCase() === 'is not empty') {
      dispatch(filterIsNotEmptyThunk(+collectionId, item.columnField));
    }

    setValue('');
  }

  return (
    <form
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        paddingLeft: '1.4rem',
      }}
      onSubmit={handleSubmit}
    >
      <TextField
        name="contains-operator"
        placeholder="Filter value"
        type="date"
        value={value}
        onChange={handleFilterChange}
        ref={elemRef}
      />
      <IconButton type="submit">
        <CheckIcon />
      </IconButton>
    </form>
  );
};

export const ButtonSubmit = (props: GridFilterInputValueProps) => {
  const { item, focusElementRef } = props;
  // need to find another way
  const { collectionId } = useParams();

  const dispatch = useDispatch<AppDispatchType>();

  const elemRef = React.useRef<HTMLButtonElement>(null);
  React.useImperativeHandle(focusElementRef, () => ({
    focus: () => {
      elemRef.current?.focus();
    },
  }));

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!collectionId) return;

    if (item.operatorValue?.toLowerCase() === 'empty') {
      dispatch(filterIsEmptyThunk(+collectionId, item.columnField));
    }

    if (item.operatorValue?.toLowerCase() === 'is not empty') {
      dispatch(filterIsNotEmptyThunk(+collectionId, item.columnField));
    }
  }

  return (
    <IconButton onClick={handleClick}>
      <CheckIcon />
    </IconButton>
  );
};

export const selectTagValue = (props: GridFilterInputValueProps) => {
  const [value, setValue] = useState<string>('');
  const { focusElementRef } = props;
  // need to find another way
  const { collectionId } = useParams();

  const uniqTags = new Set<string>();

  const result: ItemType[] | null = useSelector(getCollectionListSelector);

  result?.forEach((item) => {
    item.tags?.forEach((tag) => {
      uniqTags.add(tag.content);
    });
  });

  const allTags = Array.from(uniqTags);

  const dispatch = useDispatch<AppDispatchType>();

  const selectRef = React.useRef<HTMLDivElement>(null);
  React.useImperativeHandle(focusElementRef, () => ({
    focus: () => {
      selectRef.current?.querySelector('input')?.focus();
    },
  }));

  const handleFilterChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!collectionId) return;

    dispatch(filterExistTagThunk(+collectionId, value));

    setValue('');
  }

  return (
    <form
      style={{
        display: 'inline-flex',
        flexDirection: 'row',
        alignItems: 'center',
        height: 48,
        paddingLeft: '1.4rem',
      }}
      onSubmit={handleSubmit}
    >
      <InputLabel id="demo-simple-select-helper-label">Tag</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={value}
        ref={selectRef}
        label="Age"
        onChange={handleFilterChange}
        fullWidth
      >
        <MenuItem value="" />
        {allTags.map((item, idx: number) => (
          <MenuItem
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            value={item}
          >
            {item}
          </MenuItem>
        ))}
      </Select>
      <IconButton type="submit">
        <CheckIcon />
      </IconButton>
    </form>
  );
};

export const compareCountTagsComparator: GridComparatorFn<
{ content: string }[]
> = (arr1, arr2) => arr1.length - arr2.length;

export const likesComparator: GridComparatorFn<number> = (value1, value2) => value2 - value1;

export const operatorContains: GridFilterOperator = {
  label: 'Contains',
  value: 'contains',
  getApplyFilterFn: (filterItem: GridFilterItem) => {
    if (
      !filterItem.columnField
      || !filterItem.value
      || !filterItem.operatorValue
    ) {
      return null;
    }

    return (params: GridCellParams): boolean => Number(params.value) >= Number(filterItem.value);
  },
  InputComponent: inputTextValue,
  InputComponentProps: { type: 'text' },
};

export const operatorStartsWith: GridFilterOperator = {
  label: 'Starts with',
  value: 'starts with',
  getApplyFilterFn: (filterItem: GridFilterItem) => {
    if (
      !filterItem.columnField
      || !filterItem.value
      || !filterItem.operatorValue
    ) {
      return null;
    }

    return (params: GridCellParams): boolean => Number(params.value) >= Number(filterItem.value);
  },
  InputComponent: inputTextValue,
  InputComponentProps: { type: 'text' },
};

export const operatorEquals: GridFilterOperator = {
  label: 'Equals',
  value: 'equals',
  getApplyFilterFn: (filterItem: GridFilterItem) => {
    if (
      !filterItem.columnField
      || !filterItem.value
      || !filterItem.operatorValue
    ) {
      return null;
    }

    return (params: GridCellParams): boolean => Number(params.value) >= Number(filterItem.value);
  },
  InputComponent: inputTextValue,
  InputComponentProps: { type: 'text' },
};

export const operatorIs: GridFilterOperator = {
  label: 'is',
  value: 'is',
  getApplyFilterFn: (filterItem: GridFilterItem) => {
    if (
      !filterItem.columnField
      || !filterItem.value
      || !filterItem.operatorValue
    ) {
      return null;
    }

    return (params: GridCellParams): boolean => Number(params.value) >= Number(filterItem.value);
  },
  InputComponent: inputDateValue,
  InputComponentProps: { type: 'text' },
};

export const operatorIsEmpty: GridFilterOperator = {
  label: 'Empty',
  value: 'empty',
  getApplyFilterFn: (filterItem: GridFilterItem) => {
    if (
      !filterItem.columnField
      || !filterItem.value
      || !filterItem.operatorValue
    ) {
      return null;
    }

    return (params: GridCellParams): boolean => Number(params.value) >= Number(filterItem.value);
  },
  InputComponent: ButtonSubmit,
  InputComponentProps: { type: 'text' },
};

export const operatorIsNotEmpty: GridFilterOperator = {
  label: 'Is not empty',
  value: 'is not empty',
  getApplyFilterFn: (filterItem: GridFilterItem) => {
    if (
      !filterItem.columnField
      || !filterItem.value
      || !filterItem.operatorValue
    ) {
      return null;
    }

    return (params: GridCellParams): boolean => Number(params.value) >= Number(filterItem.value);
  },
  InputComponent: ButtonSubmit,
  InputComponentProps: { type: 'text' },
};

export const operatorExistTag: GridFilterOperator = {
  label: 'Exist tag',
  value: 'exist tag',
  getApplyFilterFn: (filterItem: GridFilterItem) => {
    if (
      !filterItem.columnField
      || !filterItem.value
      || !filterItem.operatorValue
    ) {
      return null;
    }

    return (params: GridCellParams): boolean => Number(params.value) >= Number(filterItem.value);
  },
  InputComponent: selectTagValue,
  InputComponentProps: { type: 'select' },
};

export const operatorAfter: GridFilterOperator = {
  label: 'After',
  value: 'after',
  getApplyFilterFn: (filterItem: GridFilterItem) => {
    if (
      !filterItem.columnField
      || !filterItem.value
      || !filterItem.operatorValue
    ) {
      return null;
    }

    return (params: GridCellParams): boolean => Number(params.value) >= Number(filterItem.value);
  },
  InputComponent: inputDateValue,
  InputComponentProps: { type: 'number' },
};

export const operatorBefore: GridFilterOperator = {
  label: 'Before',
  value: 'before',
  getApplyFilterFn: (filterItem: GridFilterItem) => {
    if (
      !filterItem.columnField
      || !filterItem.value
      || !filterItem.operatorValue
    ) {
      return null;
    }

    return (params: GridCellParams): boolean => Number(params.value) >= Number(filterItem.value);
  },
  InputComponent: inputDateValue,
  InputComponentProps: { type: 'number' },
};
