import React, { useState, useContext } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Typography, Box, Paper, Grid, CircularProgress, useMediaQuery,
} from '@material-ui/core';
import DarkModeToggle from 'react-dark-mode-toggle';
import LocationForm from '../LocationForm';
import WeatherCardContainer from '../WeatherCardContainer';
import { useAlert } from '../../context/AlertContext';
import { ThemeContext } from '../../context/ThemeContext';

function Dashboard() {
  const [weather, setWeather] = useState([]);
  const [showLoading, setShowloading] = useState(false); // true will show loading wheel

  const theme = useTheme();
  const { showErrorAlert } = useAlert();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const useStyles = makeStyles(() => ({
    header: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    paper: {
      padding: theme.spacing(2),
    },
    toggleButton: {
      marginLeft: theme.spacing(4),
      marginTop: theme.spacing(3),
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
      <Box className={classes.header} m={4}>
        <Typography variant="h3" color="primary" style={{ fontFamily: 'Pacifico', textAlign: 'center' }}>Welcome to my weather app</Typography>
        {
          matches && (
          <DarkModeToggle
            className={classes.toggleButton}
            onChange={toggleTheme}
            checked={darkMode}
            size={60}
          />
          )
        }
      </Box>
      <Grid container>
        <Grid item xs={12} sm={1} lg={2} />
        <Grid item xs={12} sm={10} lg={8}>
          <Paper className={classes.paper} elevation={3}>
            <LocationForm
              handleSetWeather={handleSetWeather}
              handleShowLoading={handleShowLoading}
              showErrorAlert={showErrorAlert}
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
