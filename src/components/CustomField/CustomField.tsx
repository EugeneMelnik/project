/* eslint-disable react/no-array-index-key */
import React, { FC, useState } from 'react';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import {
  Field,
  FormikErrors,
  FormikHandlers,
  FormikTouched,
} from 'formik';
import { FormikProps } from 'formik';
import EditIcon from '@mui/icons-material/Edit';

interface ICustomField<T extends object> {
  formik: {
    values: T;
    handleChange: FormikHandlers['handleChange'];
    setFieldValue: (field: string, value: unknown) => void;
    touched: FormikTouched<T>;
    errors: FormikErrors<T>;
  };
  field: Record<string, string>;
  typeField: 'create' | 'update';
}

const CustomField = <T extends object>({ formik, field, typeField }: ICustomField<T>) => {
  const [showFormEl, setShowFormEl] = useState<boolean>(false);

  const [key] = Object.keys(field);

  if (field[key]) {
    const type = key.slice(0, -4);

    if (type === 'multiLine') {
      return (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">{field[key]}</Typography>
            <Box sx={{ display: typeField === 'update' ? 'block' : 'none' }}>
              <IconButton onClick={() => setShowFormEl(true)}>
                <EditIcon />
              </IconButton>
            </Box>
          </Box>
          {(showFormEl || typeField === 'create') && (
            <TextareaAutosize
              name={key}
              value={String(formik.values[key as keyof T] || '')}
              onChange={formik.handleChange}
              style={{
                minHeight: '5rem',
                padding: '.7rem',
                backgroundColor: 'transparent',
              }}
            />
          )}
        </>
      );
    }

    if (type === 'checkbox') {
      const [state, setState] = useState('');
      const str = field[key];
      const [fieldValue] = str.split(':');
      const checkboxes = str.split(':')[1].split(',');

      return (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">{fieldValue}</Typography>
            <Box sx={{ display: typeField === 'update' ? 'block' : 'none' }}>
              <IconButton onClick={() => setShowFormEl(true)}>
                <EditIcon />
              </IconButton>
            </Box>
          </Box>
          {(showFormEl || typeField === 'create')
            && checkboxes.map((value: string, index: number) => (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label style={{ marginLeft: '1.4rem' }} key={index}>
                <Field
                  component={Checkbox}
                  name={key}
                  value={value}
                  checked={value === state}
                  onChange={() => {
                    setState(value);
                    formik.setFieldValue(key, value);
                  }}
                />
                {value}
              </label>
            ))}
        </>
      );
    }

    if (type === 'radio') {
      return (
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">{field[key]}</Typography>
            <Box sx={{ display: typeField === 'update' ? 'block' : 'none' }}>
              <IconButton onClick={() => setShowFormEl(true)}>
                <EditIcon />
              </IconButton>
            </Box>
          </Box>
          <FormControl>
            {(showFormEl || typeField === 'create') && (
              <RadioGroup
                name={key}
                value={String(formik.values[key as keyof T] || '')}
                onChange={formik.handleChange}
              >
                <FormControlLabel
                  sx={{ paddingLeft: '0.7rem' }}
                  value={1}
                  control={<Radio />}
                  label="Yes"
                />
                <FormControlLabel
                  sx={{ paddingLeft: '0.7rem' }}
                  value={0}
                  control={<Radio />}
                  label="No"
                />
              </RadioGroup>
            )}
          </FormControl>
        </Box>
      );
    }

    return (
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body1">{field[key]}</Typography>
          <Box sx={{ display: typeField === 'update' ? 'block' : 'none' }}>
            <IconButton onClick={() => setShowFormEl(true)}>
              <EditIcon />
            </IconButton>
          </Box>
        </Box>
        {(showFormEl || typeField === 'create') && (
          <TextField
            type={type}
            name={key}
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={String(formik.values[key as keyof T] || '')}
            onChange={formik.handleChange}
            error={Boolean(formik.touched[key as keyof T] && formik.errors[key as keyof T])}
            helperText={formik.touched[key as keyof T] ? String(formik.errors[key as keyof T] || '') : ''}
          />
        )}
      </Box>
    );
  }

  return null;
};

export default CustomField;
