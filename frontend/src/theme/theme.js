import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0A0A0A",
      light: "#2D2D2D",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#C8974F",
      light: "#E8B97A",
      dark: "#9B6E31",
      contrastText: "#FFFFFF",
    },
    success: {
      main: "#1A7A4A",
      light: "#E8F5EE",
    },
    warning: {
      main: "#C8870A",
      light: "#FEF3DC",
    },
    error: {
      main: "#B52A2A",
      light: "#FDEAEA",
    },
    background: {
      default: "#F5F3EF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0A0A0A",
      secondary: "#6B6560",
    },
    divider: "#E8E4DE",
  },

  typography: {
    fontFamily: '"Cormorant Garamond", "Georgia", serif',

    h1: { fontWeight: 700, letterSpacing: "-0.03em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 600, letterSpacing: "-0.01em" },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600, letterSpacing: "0.01em" },

    subtitle1: {
      fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
      fontWeight: 500,
      letterSpacing: "0.01em",
    },
    subtitle2: {
      fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
      fontWeight: 500,
      fontSize: "0.8rem",
      letterSpacing: "0.08em",
      textTransform: "uppercase",
    },

    body1: {
      fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
      fontSize: "0.95rem",
    },
    body2: {
      fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
      fontSize: "0.85rem",
      color: "#6B6560",
    },

    button: {
      fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
      fontWeight: 600,
      letterSpacing: "0.06em",
    },

    caption: {
      fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
      fontSize: "0.75rem",
      letterSpacing: "0.05em",
    },

    overline: {
      fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
      fontSize: "0.7rem",
      fontWeight: 700,
      letterSpacing: "0.12em",
    },
  },

  shape: {
    borderRadius: 8,
  },

  shadows: [
    "none",
    "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)",
    "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
    "0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
    "0 6px 24px rgba(0,0,0,0.10), 0 3px 8px rgba(0,0,0,0.04)",
    "0 8px 32px rgba(0,0,0,0.12)",
    ...Array(19).fill("none"),
  ],

  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          border: "1px solid #E8E4DE",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          transition: "box-shadow 0.25s ease, transform 0.25s ease",
          "&:hover": {
            boxShadow: "0 6px 24px rgba(0,0,0,0.10)",
            transform: "translateY(-2px)",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: "none",
          padding: "10px 24px",
          fontSize: "0.88rem",
          fontWeight: 600,
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
        },
        outlined: {
          borderWidth: "1.5px",
          "&:hover": { borderWidth: "1.5px" },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 600,
          fontSize: "0.75rem",
          letterSpacing: "0.04em",
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: '"DM Sans", sans-serif',
          fontWeight: 600,
          fontSize: "0.88rem",
          letterSpacing: "0.02em",
          minWidth: 120,
          padding: "12px 20px",
          "&.Mui-selected": {
            color: "#0A0A0A",
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#C8974F",
          height: 2,
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#E8E4DE",
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          fontFamily: '"Cormorant Garamond", serif',
          fontWeight: 700,
        },
      },
    },
  },
});

export default theme;