import React from 'react';
import {
  Button, TextField, FormControlLabel, Checkbox,
  Link, Paper, Box, Grid, Typography,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

function LocationForm() {
  return (
    <form>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={(e) => setEmail(e.target.value)}
      />
    </form>
  );
}

export default LocationForm;
