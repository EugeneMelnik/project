import React, { FC, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import {
  Box,
  IconButton,
  List,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { makeStyles } from '@material-ui/core';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { FieldArray } from 'formik';

const useStyles = makeStyles({
  head: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const UpdateFormField: FC<any> = ({ formik, value, field }) => {
  const [showFormEl, setShowFormEl] = useState<boolean>(false);

  const checkboxCount = formik.values[field]?.count;

  const classes = useStyles();

  return (
    <Box>
      <Box className={classes.head}>
        {!['checkboxKey1', 'checkboxKey2', 'checkboxKey3'].includes(field) && (
          <Box>
            <Typography variant="body2">
              {formik.values[field] || value}
            </Typography>
          </Box>
        )}
        {['checkboxKey1', 'checkboxKey2', 'checkboxKey3'].includes(field) && (
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2">
              {formik.values[field].values[0]
                ? formik.values[field].field
                : value.split(':')[0]}
            </Typography>
            <List>
              Variants
              {formik.values[field].values[0]
                ? formik.values[field].values
                  .slice(0, checkboxCount)
                  .map((str: string, idx: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <ListItemText sx={{ paddingLeft: '1.5rem' }} key={idx}>
                      {str}
                    </ListItemText>
                  ))
                : value
                  .split(':')[1]
                  .split(',')
                  .map((str: string, idx: any) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <ListItemText sx={{ paddingLeft: '1.5rem' }} key={idx}>
                      {str}
                    </ListItemText>
                  ))}
            </List>
          </Box>
        )}
        <Box>
          <IconButton onClick={() => setShowFormEl(true)}>
            {value ? <EditIcon /> : <AddCircleOutlineRoundedIcon />}
          </IconButton>
          <IconButton onClick={() => setShowFormEl(false)}>
            <CheckIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              formik.resetForm({ values: { ...formik.values, [field]: '' } });
            }}
          >
            <CleaningServicesIcon />
          </IconButton>
        </Box>
      </Box>
      {!['checkboxKey1', 'checkboxKey2', 'checkboxKey3'].includes(field)
        && showFormEl && (
          <TextField
            name={field}
            fullWidth
            value={formik.values[field]}
            onChange={formik.handleChange}
            error={formik.touched[field] && Boolean(formik.errors[field])}
            helperText={formik.touched[field] && formik.errors[field]}
          />
      )}
      {['checkboxKey1', 'checkboxKey2', 'checkboxKey3'].includes(field)
        && showFormEl && (
          <Box>
            <TextField
              name={`${field}.field`}
              value={formik.values[field].field}
              onChange={formik.handleChange}
            />
            <TextField
              type="number"
              InputProps={{
                inputProps: {
                  min: 1,
                  max: formik.values[field].values.length + 1,
                },
              }}
              name={`${field}.count`}
              value={formik.values[field].count}
              onChange={formik.handleChange}
            />
            <FieldArray
              name="values"
              render={() => {
                const countCheckboxes = formik.values[field].count;
                const arrCheckboxes: string[] = new Array(countCheckboxes).fill(
                  '',
                );
                if (!formik.values[field].field) return null;

                return (
                  <>
                    {arrCheckboxes.map((value: string, index: any) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Box key={index}>
                        <TextField
                          name={`${field}.values[${index}]`}
                          value={formik.values[field].values[index]}
                          onChange={formik.handleChange}
                        />
                      </Box>
                    ))}
                  </>
                );
              }}
            />
          </Box>
      )}
    </Box>
  );
};

export default UpdateFormField;
