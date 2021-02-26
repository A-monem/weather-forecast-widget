import React, { useState, useRef } from 'react';
import {
  Button, TextField, Menu, MenuItem,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import axios from 'axios';
import { useAlert } from '../../context/AlertContext';

function LocationForm() {
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

  const handleSubmitLocation = (e) => {
    e.preventDefault();
    // I am useing a node server deployed on heroku to do the api calls to MetaWeather in order to
    // bypass CORS issue
    // axios.get(`https://limitless-dusk-13082.herokuapp.com/api/weather/${location}`)
    axios.get(`http://localhost:4000/api/weather/${location}`)
      .then((response) => {
        const locationsList = response.data.map((loc) => ({ title: loc.title, id: loc.woeid }));

        switch (locationsList.length) {
          case 0:
            showErrorAlert('City does not exist');
            break;
          case 1:
            console.log(locationsList);
            break;
          default:
            setMultiLocations(locationsList);
            setOpen(true);
        }
      });
  };

  const handleCloseList = () => {
    setOpen(false);
  };

  return (
    <form className={classes.form} onSubmit={handleSubmitLocation}>
      <div className={classes.textField}>
        <TextField
          variant="outlined"
          margin="normal"
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
          <MenuItem key={loc.id} onClick={handleCloseList}>{loc.title}</MenuItem>
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

export default LocationForm;
