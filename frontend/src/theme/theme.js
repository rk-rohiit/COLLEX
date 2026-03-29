import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#cc0102",
    },
    secondary: {
      main: "#FF6F61",
    },
    background: {
      default: "#0f0f0f",
      paper: "#1a1a1a",
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;