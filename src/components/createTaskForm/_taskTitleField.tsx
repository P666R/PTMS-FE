import { FC, ReactElement } from 'react';
import { TextField } from '@mui/material';
import { ITextField } from './interfaces/ITextField';
import PropTypes from 'prop-types';

export const TaskTitleField: FC<ITextField> = (props): ReactElement => {
  const {
    disabled = false,
    onChange = (e) => console.log(e),
    value = '',
  } = props;
  return (
    <TextField
      id="title"
      name="title"
      label="Task Title"
      placeholder="Task Title"
      variant="outlined"
      size="small"
      fullWidth
      value={value}
      disabled={disabled}
      onChange={onChange}
    />
  );
};

TaskTitleField.propTypes = {
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
