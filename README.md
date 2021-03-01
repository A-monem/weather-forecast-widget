# What is Weather App ? 
It is an application that can used to check for weather forecast for the next four days. The application 
is able to display almost all cities in the world. It displays a general description of the weather, maximum temprature, minimum temprature and wind speed.

# Live demo
https://limitless-dusk-13082.herokuapp.com/

# How it works ?
The application is connected to metaweather api. It uses two different apis. One to get location information and the other is to get weather information. Since metaweather api doesn't support CORS, the application hits a node server deployed on heroku, which in turn does all the api requests. The node server is using express and axios.

# How can I run it ?
* run app => npm start
* run tests => npm test

# Built with

## Web Application

* React
* Material UI
* axios
* moment
* Proptypes
* Jest
* Testing-library
* Eslint
* Eslint-config-airbnb

# Screenshots

![Dashboard screenshot](/screenshots/Capture_1.JPG)

![Dashboard Dark Mode screenshot](/screenshots/Capture_4.JPG)

![Menu screenshot](/screenshots/Capture_2.JPG)

![Weather screenshot](/screenshots/Capture_3.JPG)


