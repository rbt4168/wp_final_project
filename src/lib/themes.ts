import { createTheme } from '@mui/material/styles';

export const main_theme = createTheme({
  palette: {
    primary: {
      main: '#A3C4F3',
      // light: will be calculated from palette.primary.main,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#FFCFD2',
      // light: '#F5EBFF',
      // dark: will be calculated from palette.secondary.main,
      // contrastText: '#47008F',
    },
    error: {
      main: "#FA8C9E"
    },
    warning: {
      main: "#FDE4CF"
    },
    info: {
      main: "#8EECF5"
    },
    success: {
      main: "#B9FBC0"
    },
  },
});