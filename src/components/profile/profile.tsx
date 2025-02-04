import { FC, ReactElement } from 'react';
import { Avatar, Box, Typography } from '@mui/material';

export const Profile: FC = (): ReactElement => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center">
      <Avatar
        sx={{
          width: '96px',
          height: '96px',
          backgroundColor: 'primary.main',
          marginBottom: '16px',
        }}>
        <Typography
          variant="h4"
          color="text.primary">
          P
        </Typography>
      </Avatar>
      <Typography
        variant="h6"
        color="text.primary">
        Welcome P666R
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary">
        This is your personal task manager
      </Typography>
    </Box>
  );
};
