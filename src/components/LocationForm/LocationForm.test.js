/* eslint-disable no-undef */
import React from 'react';
import {
  render, screen, fireEvent, waitFor,
} from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import LocationForm from './LocationForm';

describe('component renders correctly', () => {
  test('input box renders correctly', () => {
    const handleSetWeather = jest.fn();
    const handleShowLoading = jest.fn();
    const showErrorAlert = jest.fn();

    render(<LocationForm
      handleSetWeather={handleSetWeather}
      handleShowLoading={handleShowLoading}
      showErrorAlert={showErrorAlert}
    />);
    expect(screen.getByLabelText('Enter Location *')).toBeInTheDocument();
  });

  test('submit button renders correctly', () => {
    const handleSetWeather = jest.fn();
    const handleShowLoading = jest.fn();
    const showErrorAlert = jest.fn();

    render(<LocationForm
      handleSetWeather={handleSetWeather}
      handleShowLoading={handleShowLoading}
      showErrorAlert={showErrorAlert}
    />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

describe('logic works correctly', () => {
  test('input box accepts text', () => {
    const handleSetWeather = jest.fn();
    const handleShowLoading = jest.fn();
    const showErrorAlert = jest.fn();

    render(<LocationForm
      handleSetWeather={handleSetWeather}
      handleShowLoading={handleShowLoading}
      showErrorAlert={showErrorAlert}
    />);
    fireEvent.change(screen.getByLabelText('Enter Location *'), { target: { value: 'London' } });

    expect(screen.getByLabelText('Enter Location *')).toHaveValue('London');
  });

  test('loading wheel apears when clicking submit button', async () => {
    const handleSetWeather = jest.fn();
    const handleShowLoading = jest.fn();
    const showErrorAlert = jest.fn();

    render(<LocationForm
      handleSetWeather={handleSetWeather}
      handleShowLoading={handleShowLoading}
      showErrorAlert={showErrorAlert}
    />);

    fireEvent.change(screen.getByLabelText('Enter Location *'), { target: { value: 'London' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => expect(handleShowLoading).toHaveBeenCalledTimes(1));
  });

  test('show error snakbar apears when typing wrong city "london123"', async () => {
    const mock = new MockAdapter(axios);

    mock.onGet('https://limitless-dusk-13082.herokuapp.com/api/location/london123')
      .reply(200, []);

    const handleSetWeather = jest.fn();
    const handleShowLoading = jest.fn();
    const showErrorAlert = jest.fn();

    render(<LocationForm
      handleSetWeather={handleSetWeather}
      handleShowLoading={handleShowLoading}
      showErrorAlert={showErrorAlert}
    />);

    fireEvent.change(screen.getByLabelText('Enter Location *'), { target: { value: 'london123' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => expect(showErrorAlert).toHaveBeenCalledTimes(1));
  });

  test('menu with multi location appear when response has more than one city', async () => {
    const mock = new MockAdapter(axios);

    mock.onGet('https://limitless-dusk-13082.herokuapp.com/api/location/lon')
      .reply(200, [{
        latt_long: '51.506321,-0.12714',
        location_type: 'City',
        title: 'London',
        woeid: 44418,
      },
      {
        latt_long: '41.385578,2.168740',
        location_type: 'City',
        title: 'Barcelona',
        woeid: 753692,
      }]);

    const handleSetWeather = jest.fn();
    const handleShowLoading = jest.fn();
    const showErrorAlert = jest.fn();

    render(<LocationForm
      handleSetWeather={handleSetWeather}
      handleShowLoading={handleShowLoading}
      showErrorAlert={showErrorAlert}
    />);

    fireEvent.change(screen.getByLabelText('Enter Location *'), { target: { value: 'lon' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => expect(screen.getAllByTestId(/multiLocations/i)).toHaveLength(2));
  });

  // test('select one city will show loading wheel again', async () => {
  //   const mock = new MockAdapter(axios);

  //   mock.onGet('https://limitless-dusk-13082.herokuapp.com/api/location/lon')
  //     .reply(200, [{
  //       latt_long: '51.506321,-0.12714',
  //       location_type: 'City',
  //       title: 'London',
  //       woeid: 44418,
  //     },
  //     {
  //       latt_long: '41.385578,2.168740',
  //       location_type: 'City',
  //       title: 'Barcelona',
  //       woeid: 753692,
  //     }]);

  //   const handleSetWeather = jest.fn();
  //   const handleShowLoading = jest.fn();
  //   const showErrorAlert = jest.fn();

  //   render(<LocationForm
  //     handleSetWeather={handleSetWeather}
  //     handleShowLoading={handleShowLoading}
  //     showErrorAlert={showErrorAlert}
  //   />);

  //   fireEvent.change(screen.getByLabelText('Enter Location *'), { target: { value: 'lon' } });
  //   fireEvent.click(screen.getByTestId('submit-button'));

  //   const location = await screen.findByTestId('multiLocations-1');

  //   fireEvent.click(location);
  //   // showLoading will be called three times because it will disapear while displaying the
  //   // menu of locations
  //   await waitFor(() => expect(handleShowLoading).toHaveBeenCalledTimes(3));
  // });

  test('request weather for London', async () => {
    const mock = new MockAdapter(axios);

    mock.onGet('https://limitless-dusk-13082.herokuapp.com/api/location/london')
      .reply(200, [{
        latt_long: '51.506321,-0.12714',
        location_type: 'City',
        title: 'London',
        woeid: 44418,
      }]);

    mock.onGet('https://limitless-dusk-13082.herokuapp.com/api/weather/44418')
      .reply(200, {
        consolidated_weather: [{
          air_pressure: 1032,
          applicable_date: '2021-03-01',
          created: '2021-03-01T09:20:02.099570Z',
          humidity: 72,
          id: 5852368760471552,
          max_temp: 10.87,
          min_temp: 4.36,
          predictability: 70,
          the_temp: 9.68,
          visibility: 7.087359818659031,
          weather_state_abbr: 'lc',
          weather_state_name: 'Light Cloud',
          wind_direction: 76.50746183171759,
          wind_direction_compass: 'ENE',
          wind_speed: 6.36311594593441,
        },
        {
          air_pressure: 1030,
          applicable_date: '2021-03-02',
          created: '2021-03-01T09:20:02.027488Z',
          humidity: 68,
          id: 5459869634134016,
          max_temp: 13.045,
          min_temp: 3.125,
          predictability: 70,
          the_temp: 11.76,
          visibility: 8.589835361488905,
          weather_state_abbr: 'lc',
          weather_state_name: 'Light Cloud',
          wind_direction: 80.85946579308718,
          wind_direction_compass: 'E',
          wind_speed: 3.9837486440547205,
        }],
      });

    const handleSetWeather = jest.fn();
    const handleShowLoading = jest.fn();
    const showErrorAlert = jest.fn();

    render(<LocationForm
      handleSetWeather={handleSetWeather}
      handleShowLoading={handleShowLoading}
      showErrorAlert={showErrorAlert}
    />);

    fireEvent.change(screen.getByLabelText('Enter Location *'), { target: { value: 'london' } });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => expect(handleSetWeather).toHaveBeenCalledTimes(1));
  });
});
