import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: "#4F46E5", // Indigo (modern SaaS feel)
      light: "#6366F1",
      dark: "#3730A3",
      contrastText: "#FFFFFF",
    },

    secondary: {
      main: "#FF6F61", // Coral accent (matches your earlier style)
      light: "#FF8A80",
      dark: "#E64A45",
      contrastText: "#FFFFFF",
    },

    background: {
      default: "#F9FAFB", // soft gray-white
      paper: "#FFFFFF",
    },

    text: {
      primary: "#111827",
      secondary: "#6B7280",
    },

    divider: "#E5E7EB",

    success: { main: "#22C55E" },
    warning: { main: "#F59E0B" },
    error: { main: "#EF4444" },
  },

  typography: {
    fontFamily: '"Inter", sans-serif',

    h1: { fontWeight: 800, letterSpacing: "-0.03em" },
    h2: { fontWeight: 700, letterSpacing: "-0.02em" },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },

    body1: {
      fontSize: "0.95rem",
      lineHeight: 1.6,
    },

    body2: {
      fontSize: "0.85rem",
      color: "#6B7280",
    },

    button: {
      fontWeight: 600,
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 12, // more modern rounded
  },

  shadows: [
    "none",
    "0 1px 2px rgba(0,0,0,0.04)",
    "0 2px 8px rgba(0,0,0,0.06)",
    "0 4px 14px rgba(0,0,0,0.08)",
    "0 6px 20px rgba(0,0,0,0.10)",
    "0 10px 30px rgba(0,0,0,0.12)",
    ...Array(19).fill("none"),
  ],

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#F9FAFB",
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "#FFFFFF",
          color: "#111827",
          borderBottom: "1px solid #E5E7EB",
          boxShadow: "none",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: "1px solid #E5E7EB",
          background: "#FFFFFF",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 10px 30px rgba(0,0,0,0.10)",
            transform: "translateY(-4px)",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999, // pill buttons 🔥
          padding: "10px 22px",
        },

        containedPrimary: {
          background: "linear-gradient(135deg,#4F46E5,#6366F1)",
          "&:hover": {
            background: "linear-gradient(135deg,#4338CA,#4F46E5)",
          },
        },

        containedSecondary: {
          background: "#FF6F61",
          "&:hover": {
            background: "#E65A50",
          },
        },

        outlined: {
          borderColor: "#E5E7EB",
          "&:hover": {
            background: "#F3F4F6",
          },
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "#4F46E5",
          height: 3,
          borderRadius: 2,
        },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: "#4F46E5",
          color: "#fff",
          fontWeight: 700,
        },
      },
    },
  },
});

export default theme;