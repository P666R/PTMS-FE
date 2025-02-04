import { FC, ReactElement } from 'react';
import Grid from '@mui/material/Grid2';

export const TaskArea: FC = (): ReactElement => {
  return (
    <Grid
      size={{ md: 8 }}
      px={4}>
      <h2>Task Area</h2>
    </Grid>
  );
};
