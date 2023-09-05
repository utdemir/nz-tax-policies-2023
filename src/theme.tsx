import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    // Name of the component
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#fffbfb",
        },
      },
    },
  },
});

export default theme;
