import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Grow } from '@material-ui/core';
import WeatherCard from '../WeatherCard';

function WeatherCardContainer({ weather }) {
  return (
    <>
      <Grid container spacing={2} data-testid="weather-container">
        {weather.map((dayWeather) => (
          <Grow key={dayWeather.day} in>
            <Grid item xs={12} sm={6} lg={3} data-testid="weather-item">
              <WeatherCard dayWeather={dayWeather} />
            </Grid>
          </Grow>
        ))}
      </Grid>
    </>
  );
}

WeatherCardContainer.propTypes = {
  weather: PropTypes.array.isRequired,
};

export default WeatherCardContainer;
