import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Typography, Box, Paper, Grid,
} from '@material-ui/core';
import LocationForm from '../LocationForm';

function Dashboard() {
  const [weather, setWeather] = useState([]);
  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    paper: {
      padding: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  const handleSetWeather = (weatherInfo) => {
    console.log(weatherInfo);
    setWeather(weatherInfo);
  };

  return (
    <div>
      <Box m={4}>
        <Typography variant="h3" color="primary" style={{ fontFamily: 'Pacifico', textAlign: 'center' }}>Welcome to my weather app</Typography>
      </Box>
      <Grid container>
        <Grid item xs={12} sm={1} lg={2} />
        <Grid item xs={12} sm={10} lg={8}>
          <Paper className={classes.paper} elevation={3}>
            <LocationForm handleSetWeather={handleSetWeather} />
            {/* <img src="https://www.metaweather.com/static/img/weather/c.svg" alt="logo" /> */}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={1} lg={2} />
      </Grid>
    </div>
  );
}

export default Dashboard;
