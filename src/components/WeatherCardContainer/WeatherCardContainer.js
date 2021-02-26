import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Grow } from '@material-ui/core';
import WeatherCard from '../WeatherCard';

function WeatherCardContainer({ weather }) {
  return (
    <>
      <Grid container spacing={2}>
        {weather.map((dayWeather) => (
          <Grow key={dayWeather.day} in>
            <Grid item xs={12} lg={3}>
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
