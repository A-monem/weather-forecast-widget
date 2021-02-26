import React, { useState, useRef } from 'react';
import {
  Button, TextField, Menu, MenuItem,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { useAlert } from '../../context/AlertContext';
import { getWeather, getLocation } from '../../api/metaWeather';

function LocationForm({ handleSetWeather }) {
  const [location, setLocation] = useState('');
  const [multiLocations, setMultiLocations] = useState([]);
  const [open, setOpen] = useState(false);

  const anchorRef = useRef(null);
  const theme = useTheme();
  const { showErrorAlert } = useAlert();

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
    setLocation(e.target.value);
  };

  const handleGetWeather = (id) => {
    getWeather(id)
      .then((weatherInfo) => handleSetWeather(weatherInfo))
      .catch((error) => showErrorAlert(error));
  };

  const handleGetLocation = (e) => {
    e.preventDefault();

    getLocation(location)
      .then((locationsList) => {
        switch (locationsList.length) {
          case 0:
            showErrorAlert('City does not exist');
            break;
          case 1:
            setLocation(locationsList[0].title);
            handleGetWeather(locationsList[0].id);
            break;
          default:
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
          <MenuItem key={loc.id} onClick={() => handleSelectLocation(loc)}>{loc.title}</MenuItem>
        ))}
      </Menu>
      <Button
        variant="contained"
        color="secondary"
        type="submit"
        className={classes.button}
      >
        Submit
      </Button>
    </form>
  );
}

LocationForm.propTypes = {
  handleSetWeather: PropTypes.func.isRequired,
};

export default LocationForm;
