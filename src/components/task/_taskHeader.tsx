import { FC, ReactElement } from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { ITaskHeader } from './interfaces/ITaskHeader';
import { formatDate } from 'date-fns';
import PropTypes from 'prop-types';

export const TaskHeader: FC<ITaskHeader> = (props): ReactElement => {
  const { title = 'Default Title...', date = new Date() } = props;

  return (
    <Box
      display="flex"
      width="100%"
      justifyContent="space-between"
      mb={3}>
      <Box>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box>
        <Chip
          variant="outlined"
          label={formatDate(date, 'PPP')}
        />
      </Box>
    </Box>
  );
};

TaskHeader.propTypes = {
  title: PropTypes.string,
  date: PropTypes.instanceOf(Date),
};
