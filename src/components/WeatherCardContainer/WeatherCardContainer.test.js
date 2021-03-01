/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherCardContainer from './WeatherCardContainer';
import '@testing-library/jest-dom';

const weather = [{
  day: 'Saturday',
  maxTemp: '25.5',
  minTemp: '19.4',
  state: 'Heavy Cloud',
  stateAbbr: 'hc',
  windSpeed: '9.24',
}, {
  day: 'Sunday',
  maxTemp: '26.0',
  minTemp: '20.4',
  state: 'Showers',
  stateAbbr: 's',
  windSpeed: '7.75',
}, {
  day: 'Monday',
  maxTemp: '22.3',
  minTemp: '14.3',
  state: 'Heavy Rain',
  stateAbbr: 'hr',
  windSpeed: '6.89',
},
{
  day: 'Tuesday',
  maxTemp: '13.1',
  minTemp: '4.3',
  state: 'Light Cloud',
  stateAbbr: 'lc',
  windSpeed: '4.17',
},
];

describe('component renders correctly', () => {
  test('grid container component renders correctly', () => {
    render(<WeatherCardContainer weather={weather} />);
    expect(screen.getByTestId('weather-container')).toBeInTheDocument();
  });

  test('grid container has four children', () => {
    render(<WeatherCardContainer weather={weather} />);
    expect(screen.getAllByTestId('weather-item')).toHaveLength(4);
  });
});
