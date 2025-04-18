import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  mode === "light" ? lightTheme : darkTheme;

// Spotify Dark Theme
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1DB954", // Spotify Green
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFFFFF",
      contrastText: "#191414",
    },
    error: {
      main: "#e53935",
    },
    warning: {
      main: "#ffa726",
    },
    info: {
      main: "#29b6f6",
    },
    success: {
      main: "#66bb6a",
    },
    background: {
      default: "#191414", // Spotify dark background
      paper: "#282828",   // Slightly lighter for paper elements
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B3B3B3",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});

// Spotify Light Theme (Inspired)
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1DB954", // Spotify Green
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#1DB954", // Reusing the accent color
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#e53935",
    },
    warning: {
      main: "#ffa726",
    },
    info: {
      main: "#29b6f6",
    },
    success: {
      main: "#66bb6a",
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5",
    },
    text: {
      primary: "#191414",
      secondary: "#4D4D4D",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
});
