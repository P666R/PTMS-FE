import { FC, ReactElement } from 'react';
import { Box, Stack, Typography } from '@mui/material';

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
        sx={{ width: '100%' }}></Stack>
      <Stack
        direction="row"
        spacing={2}
        sx={{ width: '100%' }}></Stack>
    </Box>
  );
};
