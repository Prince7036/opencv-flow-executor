import { type JSX } from 'react';
import { Grid } from '@mui/material';
import WorkflowEditor from './workflow/WorkflowEditor';

const App = (): JSX.Element => {
  return (
    <Grid container spacing={2} size={12} sx={{ height: '100vh', display: 'flex' }}>
      <WorkflowEditor />
    </Grid>
  )
}

export default App;
