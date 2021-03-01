/* eslint-disable max-len */
import React, { useState, useRef } from 'react';
import {
  Button, TextField, Menu, MenuItem,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { getWeather, getLocation } from '../../api/metaWeather'; // axios api

function LocationForm({ handleSetWeather, handleShowLoading, showErrorAlert }) {
  const [location, setLocation] = useState('');
  const [multiLocations, setMultiLocations] = useState([]); // used to hold all cities returned by getLocation
  const [open, setOpen] = useState(false); // open a menu of all cities returned by getLocation

  const anchorRef = useRef(null); // ancher menu under input box
  const theme = useTheme();

  const useStyles = makeStyles(() => ({
    form: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    textField: {
      flexGrow: 1,
    },
    button: {
      margin: theme.spacing(3),
    },
  }));
  const classes = useStyles();

  const handleSetLocation = (e) => {
    handleSetWeather([]);
    setLocation(e.target.value);
  };

  // calls metaWeather api to get weather of a particular city
  const handleGetWeather = (id) => {
    getWeather(id)
      .then((weatherInfo) => {
        handleShowLoading(false);
        handleSetWeather(weatherInfo);
      })
      .catch((error) => showErrorAlert(error));
  };

  // call metaWeather api to get location unique id
  const handleGetLocation = (e) => {
    e.preventDefault();
    handleShowLoading(true);
    getLocation(location)
      .then((locationsList) => {
        switch (locationsList.length) {
          case 0:
            handleShowLoading(false);
            showErrorAlert('City does not exist');
            break;
          case 1:
            setLocation(locationsList[0].title);
            handleGetWeather(locationsList[0].id);
            break;
          default:
            handleShowLoading(false);
            setMultiLocations(locationsList);
            setOpen(true);
        }
      })
      .catch((error) => showErrorAlert(error));
  };

  const handleCloseList = () => {
    setOpen(false);
  };

  const handleSelectLocation = (selectedLocation) => {
    handleShowLoading(true);
    setLocation(selectedLocation.title);
    handleGetWeather(selectedLocation.id);
    handleCloseList();
  };

  return (
    <form className={classes.form} onSubmit={handleGetLocation}>
      <div className={classes.textField}>
        <TextField
          variant="outlined"
          margin="normal"
          value={location}
          required
          fullWidth
          id="location"
          label="Enter Location"
          name="location"
          placeholder="London"
          autoFocus
          onChange={handleSetLocation}
        />
        <div ref={anchorRef} />
      </div>
      <Menu
        id="simple-menu"
        anchorEl={anchorRef.current}
        keepMounted
        open={open}
        onClose={handleCloseList}
      >
        {multiLocations.map((loc) => (
          <MenuItem key={loc.id} data-testid="multiLocations" onClick={() => handleSelectLocation(loc)}>{loc.title}</MenuItem>
        ))}
      </Menu>
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        className={classes.button}
        data-testid="submit-button"
      >
        Submit
      </Button>
    </form>
  );
}

LocationForm.propTypes = {
  handleSetWeather: PropTypes.func.isRequired,
  handleShowLoading: PropTypes.func.isRequired,
  showErrorAlert: PropTypes.func.isRequired,
};

export default LocationForm;
