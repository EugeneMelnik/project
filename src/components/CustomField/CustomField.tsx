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
import { Field } from 'formik';
import EditIcon from '@mui/icons-material/Edit';

interface ICustomField {
  formik: any;
  field: any;
  typeField: 'create' | 'update';
}

const CustomField: FC<ICustomField> = ({ formik, field, typeField }) => {
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
              value={formik.values.field}
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
            && checkboxes.map((value: string, index: any) => (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label style={{ marginLeft: '1.4rem' }} key={index}>
                <Field
                  component={Checkbox}
                  name={key}
                  value={value}
                  checked={value === state}
                  onChange={() => {
                    setState(value);
                    formik.values[key] = value;
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
                value={formik.values.field}
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
            value={formik.values.field}
            onChange={formik.handleChange}
            error={formik.touched.field && Boolean(formik.errors.field)}
            helperText={formik.touched.field && formik.errors.field}
          />
        )}
      </Box>
    );
  }

  return null;
};

export default CustomField;
