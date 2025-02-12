import { FC, ReactElement, useCallback, useMemo } from 'react';
import { Grid2, Box, Alert, LinearProgress } from '@mui/material';
import { format } from 'date-fns';
import { TaskCounter } from '../taskCounter/taskCounter';
import { Task } from '../task/task';
import { useMutation, useQuery } from '@tanstack/react-query';
import { sendApiRequest } from '../../helpers/sendApiRequest';
import { ITaskApi } from './interfaces/ITaskApi';
import { Status } from '../createTaskForm/enums/Status';
import { IUpdateTask } from '../createTaskForm/interfaces/IUpdateTask';

export const TaskArea: FC = (): ReactElement => {
  const { data, error, isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () =>
      await sendApiRequest<ITaskApi[]>(
        'http://localhost:3200/api/v1/tasks',
        'GET',
      ),
  });

  const updateTaskMutation = useMutation({
    mutationFn: (data: IUpdateTask) =>
      sendApiRequest('http://localhost:3200/api/v1/tasks', 'PATCH', data),
  });

  const onStatusChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
      updateTaskMutation.mutate({
        id,
        status: e.target.checked ? Status.inProgress : Status.todo,
      });
    },
    [updateTaskMutation],
  );

  const markCompleteHandler = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) => {
      e.stopPropagation();
      updateTaskMutation.mutate({
        id,
        status: Status.completed,
      });
    },
    [updateTaskMutation],
  );

  const formattedDate = useMemo(() => format(new Date(), 'PPPP'), []);

  return (
    <Grid2
      size={{ md: 8 }}
      px={4}>
      <Box
        mb={8}
        px={4}>
        <h2>Status Of Your Tasks As On {formattedDate}</h2>
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
          {error && (
            <Alert severity="error">
              There was an error fetching your tasks
            </Alert>
          )}
          {!error && Array.isArray(data) && data.length === 0 && (
            <Alert severity="warning">
              You do not have any tasks created yet. Start creating some tasks
            </Alert>
          )}
          {isLoading && <LinearProgress />}
          {Array.isArray(data) &&
            data.length > 0 &&
            data.map(
              (task) =>
                (Status.todo === task.status ||
                  Status.inProgress === task.status) && (
                  <Task
                    key={task.id}
                    {...task}
                    date={new Date(task.date)}
                    onStatusChange={onStatusChangeHandler}
                    onClick={markCompleteHandler}
                  />
                ),
            )}
        </Grid2>
      </Grid2>
    </Grid2>
  );
};
