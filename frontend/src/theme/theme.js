import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1E3A8A", // 🔵 Trust Blue
      dark: "#0A2647", // Deep blue for hover states
      contrastText: "#FFFFFF", // Standard is 'contrastText', not 'contrast'
    },
    secondary: {
      main: "#FF6A00", // 🟠 Action Orange
      // custom colors should ideally be separate or use 'warning' specifically
    },
    warning: {
      main: "#f7d448", // Overriding the default MUI warning color
    },
    success: {
      main: "#2ECC71", // Using 'success' for your verified green
    },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#0F172A",
      secondary: "#475569", // Slightly darker for better readability
    },
  },

  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeightBold: 700,
    h1: { fontWeight: 800 },
    button: { fontWeight: 600 },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true, // Flat design looks better for Collex
      },
      styleOverrides: {
        root: {
          borderRadius: 10, // Slightly less rounded than 999 for a modern look
          padding: '8px 20px',
          textTransform: "none",
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#152C6D',
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#0F172A",
          boxShadow: "0 2px 10px rgba(0,0,0,0.04)", // Subtler shadow
          borderBottom: "1px solid #E2E8F0", // Cleaner separation
        },
      },
    },
    
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        },
      },
    },
  },
});

export default theme;