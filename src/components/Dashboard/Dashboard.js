import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Typography, Box, Paper, Grid,
} from '@material-ui/core';
import LocationForm from '../LocationForm';

function Dashboard() {
  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    paper: {
      padding: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  return (
    <div>
      <Box m={3}>
        <Typography variant="h3" color="primary" style={{ fontFamily: 'Pacifico', textAlign: 'center' }}>Welcome to my weather app</Typography>
      </Box>
      <Grid container>
        <Grid item xs={12} lg={2} />
        <Grid item xs={12} lg={8}>
          <Paper className={classes.paper} elevation={3}>
            <LocationForm />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={2} />
      </Grid>
    </div>
  );
}

export default Dashboard;
