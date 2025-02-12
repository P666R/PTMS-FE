import { FC, ReactElement } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import PropTypes from 'prop-types';
import { ISelectField } from './interfaces/ISelectField';

export const TaskSelectField: FC<ISelectField> = (props): ReactElement => {
  const {
    disabled = false,
    onChange = (e: SelectChangeEvent) => console.log(e),
    items = [{ value: '', label: 'Add Items' }],
    name = 'SelectBox',
    label = 'SelectBox',
    value = '',
  } = props;

  return (
    <FormControl
      fullWidth
      size="small">
      <InputLabel id={`${name}-id`}>{label}</InputLabel>
      <Select
        labelId={`${name}-id`}
        id={`${name}-id-select`}
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}>
        {items.map((item, index) => (
          <MenuItem
            key={item.value + index}
            value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

TaskSelectField.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ),
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
};
