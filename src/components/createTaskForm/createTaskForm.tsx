import { FC, ReactElement, useState, useEffect, useCallback } from 'react';
import {
  Box,
  Stack,
  Typography,
  LinearProgress,
  Button,
  Alert,
  AlertTitle,
} from '@mui/material';
import { TaskTitleField } from './_taskTitleField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import { TaskSelectField } from './_taskselectField';
import { Status } from './enums/Status';
import { Priority } from './enums/Priority';
import { useMutation } from '@tanstack/react-query';
import { sendAPiRequest } from '../../helpers/sendApiRequest';
import { ICreateTask } from '../taskArea/interfaces/ICreateTask';

export const CreateTaskForm: FC = (): ReactElement => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<Date | null>(new Date());
  const [status, setStatus] = useState<string>(Status.todo);
  const [priority, setPriority] = useState<string>(Priority.normal);
  const [showSuccess, setShowSuccess] = useState(false);

  const createTaskMutation = useMutation({
    mutationFn: (data: ICreateTask) =>
      sendAPiRequest('http://localhost:3200/api/v1/tasks', 'POST', data),
  });

  useEffect(() => {
    if (createTaskMutation.isSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);

        setTitle('');
        setDescription('');
        setDate(new Date());
        setStatus(Status.todo);
        setPriority(Priority.normal);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [createTaskMutation.isSuccess]);

  const createTaskHandler = useCallback(() => {
    if (!title || !description || !date) {
      return;
    }

    const task: ICreateTask = {
      title,
      description,
      date: date.toString(),
      priority,
      status,
    };

    createTaskMutation.mutate(task);
  }, [title, description, date, priority, status, createTaskMutation]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}>
      {showSuccess && (
        <Alert
          severity="success"
          sx={{
            width: '100%',
            marginBottom: '16px',
          }}>
          <AlertTitle>Success</AlertTitle>
          Task created successfully
        </Alert>
      )}
      <Typography
        mb={2}
        component="h2"
        variant="h6">
        Create a task
      </Typography>
      <Stack
        spacing={2}
        sx={{ width: '100%' }}>
        <TaskTitleField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={createTaskMutation.isPending}
        />
        <TaskDescriptionField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={createTaskMutation.isPending}
        />
        <TaskDateField
          value={date}
          onChange={(newDate) => setDate(newDate)}
          disabled={createTaskMutation.isPending}
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: '100%' }}>
          <TaskSelectField
            label="Status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={createTaskMutation.isPending}
            items={[
              {
                value: Status.todo,
                label: Status.todo.toUpperCase(),
              },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
            ]}
          />
          <TaskSelectField
            label="Priority"
            name="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={createTaskMutation.isPending}
            items={[
              {
                value: Priority.low,
                label: Priority.low.toUpperCase(),
              },
              {
                value: Priority.normal,
                label: Priority.normal.toUpperCase(),
              },
              {
                value: Priority.high,
                label: Priority.high.toUpperCase(),
              },
            ]}
          />
        </Stack>
        {createTaskMutation.isPending && <LinearProgress />}
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={createTaskHandler}
          disabled={!title || !description || !date || !status || !priority}>
          Create A Task
        </Button>
      </Stack>
    </Box>
  );
};
