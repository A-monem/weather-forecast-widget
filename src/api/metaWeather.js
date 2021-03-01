import axios from 'axios';
import moment from 'moment';
// I am using a node server deployed on heroku to perform the api calls to MetaWeather in order to
// bypass CORS issue

const getWeather = (id) => new Promise((resolve, reject) => {
  try {
    axios.get(`https://limitless-dusk-13082.herokuapp.com/api/weather/${id}`)
      .then((response) => {
        const weatherInfo = response.data.consolidated_weather.map((dayWeatherInfo) => ({
          maxTemp: dayWeatherInfo.max_temp.toFixed(1),
          minTemp: dayWeatherInfo.min_temp.toFixed(1),
          state: dayWeatherInfo.weather_state_name,
          stateAbbr: dayWeatherInfo.weather_state_abbr,
          windSpeed: dayWeatherInfo.wind_speed.toFixed(2),
          day: moment(dayWeatherInfo.applicable_date).format('dddd'),
        }));

        weatherInfo.shift();
        weatherInfo.pop();

        resolve(weatherInfo);
      });
  } catch (error) {
    reject(error);
  }
});

const getLocation = (location) => new Promise((resolve, reject) => {
  try {
    axios.get(`https://limitless-dusk-13082.herokuapp.com/api/location/${location}`)
      .then((response) => {
        const locationsList = response.data.map((loc) => ({ title: loc.title, id: loc.woeid }));

        resolve(locationsList);
      });
  } catch (error) {
    reject(error);
  }
});

export { getWeather, getLocation };
