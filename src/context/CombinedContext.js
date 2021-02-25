import React from 'react';
import PropTypes from 'prop-types';
import ThemeContextProvider from './ThemeContext';
import AlertContextProvider from './AlertContext';

function CombinedContextProvider({ children }) {
  return (
    <ThemeContextProvider>
      <AlertContextProvider>
        {children}
      </AlertContextProvider>
    </ThemeContextProvider>
  );
}

CombinedContextProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default CombinedContextProvider;
