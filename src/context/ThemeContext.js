import React, { Component, createContext } from 'react';
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';
import { amber, indigo, lightBlue } from '@material-ui/core/colors';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

class ThemeContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false,
    };
    this.toggleTheme = this.toggleTheme.bind(this);
  }

  toggleTheme() {
    this.setState((prevState) => ({
      darkMode: !prevState.darkMode,
    }));
  }

  render() {
    const { darkMode } = this.state;
    const { children } = this.props;
    let theme = createMuiTheme({
      palette: {
        primary: darkMode ? lightBlue : indigo,
        secondary: amber,
        type: darkMode ? 'dark' : 'light',
      },
      typography: {
        button: {
          textTransform: 'none',
        },
        subtitle1: {
          fontWeight: 'bold',
          '@media (max-width:960px)': {
            fontSize: '0.8rem',
          },
        },
      },
      props: {
        MuiRadio: {
          size: 'small',
          color: 'primary',
        },
        MuiButton: {
          color: 'secondary',
        },
        MuiIconButton: {
          color: 'secondary',
        },
        MuiSvgIcon: {
          color: 'secondary',
        },
      },
      overrides: {
        MuiFormControlLabel: {
          label: {
            fontSize: '0.8rem',
          },
        },
      },
    });

    theme = responsiveFontSizes(theme);

    return (
      <ThemeProvider theme={theme}>
        <ThemeContext.Provider value={{
          darkMode,
          toggleTheme: this.toggleTheme,
        }}
        >
          {children}
        </ThemeContext.Provider>
      </ThemeProvider>
    );
  }
}

ThemeContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ThemeContextProvider;
