import React from 'react';
import {
  Card, CardActionArea, CardContent, CardMedia, Typography,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

function WeatherCard({ dayWeather }) {
  const theme = useTheme();

  const useStyles = makeStyles(() => ({
    img: {
      padding: theme.spacing(2),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  }));
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.img}>
          <img src={`https://www.metaweather.com/static/img/weather/png/64/${dayWeather.stateAbbr}.png`} alt="state" />
          <Typography variant="subtitle2" color="primary" component="p">
            {dayWeather.state}
          </Typography>
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {dayWeather.day}
          </Typography>
          <Typography variant="caption" color="textSecondary" component="p">
            Max temprature:
            {' '}
            {dayWeather.maxTemp}
            {' '}
            C
          </Typography>
          <Typography variant="caption" color="textSecondary" component="p">
            Min temprature:
            {' '}
            {dayWeather.minTemp}
            {' '}
            C
          </Typography>
          <Typography variant="caption" color="textSecondary" component="p">
            Wind speed:
            {' '}
            {dayWeather.windSpeed}
            {' '}
            mph
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

WeatherCard.propTypes = {
  dayWeather: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default WeatherCard;
