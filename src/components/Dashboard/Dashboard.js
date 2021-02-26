import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Typography, Box, Paper, Grid, CircularProgress,
} from '@material-ui/core';
import LocationForm from '../LocationForm';
import WeatherCardContainer from '../WeatherCardContainer';

function Dashboard() {
  const [weather, setWeather] = useState([]);
  const [showLoading, setShowloading] = useState(false);

  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    paper: {
      padding: theme.spacing(2),
    },
    loading: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
  }));
  const classes = useStyles();

  const handleSetWeather = (weatherInfo) => {
    setWeather(weatherInfo);
  };

  const handleShowLoading = (loading) => {
    setShowloading(loading);
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
            <LocationForm
              handleSetWeather={handleSetWeather}
              handleShowLoading={handleShowLoading}
            />
          </Paper>
          <Box mt={4}>
            <WeatherCardContainer weather={weather} />
            {showLoading && (
            <div className={classes.loading}>
              <CircularProgress />
            </div>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} sm={1} lg={2} />
      </Grid>
    </div>
  );
}

export default Dashboard;
