import { FC, ReactElement } from 'react';
import { Grid2, Box } from '@mui/material';
import { format } from 'date-fns';
import { TaskCounter } from '../taskCounter/taskCounter';
import { Task } from '../task/task';

export const TaskArea: FC = (): ReactElement => {
  return (
    <Grid2
      size={{ md: 8 }}
      px={4}>
      <Box
        mb={8}
        px={4}>
        <h2>
          Status Of Your Tasks As On{' '}
          {format(new Date(), 'PPPP')}
        </h2>
      </Box>
      <Grid2
        container
        display="flex"
        justifyContent="center">
        <Grid2
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          size={{ md: 10, xs: 12 }}
          mb={8}>
          <TaskCounter />
          <TaskCounter />
          <TaskCounter />
        </Grid2>
        <Grid2
          display="flex"
          flexDirection="column"
          size={{ md: 8, xs: 10 }}>
          <Task />
          <Task />
          <Task />
        </Grid2>
      </Grid2>
    </Grid2>
  );
};
