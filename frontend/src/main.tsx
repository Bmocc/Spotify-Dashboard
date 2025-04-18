import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple, amber } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: amber[500],
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
