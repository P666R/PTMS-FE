import { FC, ReactElement } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { TaskTitleField } from './_taskTitleField';
import { TaskDescriptionField } from './_taskDescriptionField';
import { TaskDateField } from './_taskDateField';
import { TaskSelectField } from './_taskselectField';
import { Status } from './enums/Status';
import { Priority } from './enums/Priority';

export const CreateTaskForm: FC = (): ReactElement => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}>
      <Typography
        mb={2}
        component="h2"
        variant="h6">
        Create a task
      </Typography>
      <Stack
        spacing={2}
        sx={{ width: '100%' }}>
        <TaskTitleField />
        <TaskDescriptionField />
        <TaskDateField />
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: '100%' }}>
          <TaskSelectField
            label="Status"
            name="status"
            items={[
              { value: Status.todo, label: Status.todo.toUpperCase() },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
              {
                value: Status.completed,
                label: Status.completed.toUpperCase(),
              },
            ]}
          />
          <TaskSelectField
            label="Priority"
            name="priority"
            items={[
              { value: Priority.low, label: Priority.low.toUpperCase() },
              { value: Priority.normal, label: Priority.normal.toUpperCase() },
              { value: Priority.high, label: Priority.high.toUpperCase() },
            ]}
          />
        </Stack>
      </Stack>
    </Box>
  );
};
