import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Profile from './components/profile';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1A237E',
    },
    secondary: {
      main: '#E53935',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Profile />
    </ThemeProvider>
  );
}

export default App;
