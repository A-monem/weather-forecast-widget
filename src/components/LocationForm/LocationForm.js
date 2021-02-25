import React, { useState } from 'react';
import {
  Button, TextField,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

function LocationForm() {
  const [location, setLocation] = useState('');
  const theme = useTheme();
  const useStyles = makeStyles(() => ({
    form: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
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
  };

  return (
    <form className={classes.form} onSubmit={handleSubmitLocation}>
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
