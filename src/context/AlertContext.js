import React, { Component, createContext, useContext } from 'react';
import Alert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import PropTypes from 'prop-types';

export const AlertContext = createContext();

export function useAlert() {
  return useContext(AlertContext);
}

class AlertContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openError: false,
      message: '',
    };

    this.handleErrorClose = this.handleErrorClose.bind(this);
    this.handleErrorShow = this.handleErrorShow.bind(this);
  }

  handleErrorClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({
      openError: false,
    });
  }

  handleErrorShow(message) {
    this.setState({
      message,
      openError: true,
    });
  }

  render() {
    const { openError, message } = this.state;
    const { children } = this.props;

    return (
      <AlertContext.Provider
        value={{
          showErrorAlert: this.handleErrorShow,
        }}
      >
        {children}
        <Snackbar data-testid="error-snakbar" open={openError} autoHideDuration={6000} onClose={this.handleErrorClose}>
          <Alert onClose={this.handleErrorClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
      </AlertContext.Provider>
    );
  }
}

AlertContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AlertContextProvider;
