import React from 'react';
import { CssBaseline } from '@material-ui/core';
import CombinedContextProvider from './context/CombinedContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <CombinedContextProvider>
      <CssBaseline />
      <Dashboard />
    </CombinedContextProvider>
  );
}

export default App;
