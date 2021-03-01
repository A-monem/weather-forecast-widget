/* eslint-disable no-undef */
import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';
import '@testing-library/jest-dom';

const dayWeather = {
  day: 'Tuesday',
  maxTemp: '13.1',
  minTemp: '4.3',
  state: 'Light Cloud',
  stateAbbr: 'lc',
  windSpeed: '4.17',
};

describe('component renders correctly', () => {
  test('image component renders correctly', () => {
    render(<WeatherCard dayWeather={dayWeather} />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  test('h6 day component renders correctly', () => {
    render(<WeatherCard dayWeather={dayWeather} />);
    expect(screen.getByRole('heading')).toBeInTheDocument();
  });

  test('max temp parapgraph component renders correctly', () => {
    render(<WeatherCard dayWeather={dayWeather} />);
    expect(screen.getByTestId('max-temp')).toBeInTheDocument();
  });

  test('min temp parapgraph component renders correctly', () => {
    render(<WeatherCard dayWeather={dayWeather} />);
    expect(screen.getByTestId('min-temp')).toBeInTheDocument();
  });

  test('wind speed parapgraph component renders correctly', () => {
    render(<WeatherCard dayWeather={dayWeather} />);
    expect(screen.getByTestId('wind-speed')).toBeInTheDocument();
  });
});

describe('elements to show correct data', () => {
  test('day heading component renders correctly', () => {
    render(<WeatherCard dayWeather={dayWeather} />);
    expect(screen.getByRole('heading')).toHaveTextContent('Tuesday');
  });

  test('max temp parapgraph component renders correctly', () => {
    render(<WeatherCard dayWeather={dayWeather} />);
    expect(screen.getByTestId('max-temp')).toHaveTextContent('Max temprature: 13.1 C');
  });

  test('min temp parapgraph component renders correctly', () => {
    render(<WeatherCard dayWeather={dayWeather} />);
    expect(screen.getByTestId('min-temp')).toHaveTextContent('Min temprature: 4.3 C');
  });

  test('wind speed parapgraph component renders correctly', () => {
    render(<WeatherCard dayWeather={dayWeather} />);
    expect(screen.getByTestId('wind-speed')).toHaveTextContent('Wind speed: 4.17 mph');
  });
});
