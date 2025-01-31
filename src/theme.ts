import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5E35B1", // Deep Purple
      light: "#EDE7F6", // Light Purple
      dark: "#4527A0", // Darker shade of Deep Purple for hover states
    },
    secondary: {
      main: "#1D87E4", // Bright Blue
      light: "#A0D2FA", // Light Blue
      dark: "#1976D2", // Darker shade of Bright Blue for hover states
    },
    background: {
      default: "#EEF2F6", // Light Gray from style guide
      paper: "#FFFFFF", // White
    },
    text: {
      primary: "#1F2937", // Dark gray from style guide
      secondary: "#6B7280", // Gray from style guide
    },
    divider: "rgba(0, 0, 0, 0.08)",
    action: {
      hover: "#EDE7F6", // Light Purple for hover states
      selected: "#EDE7F6", // Light Purple for selected states
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      lineHeight: 1.5,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
        },
        contained: {
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        outlined: {
          borderColor: "#5E35B1",
          color: "#5E35B1",
          "&:hover": {
            backgroundColor: "rgba(94, 53, 177, 0.04)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
          border: "1px solid rgba(0, 0, 0, 0.08)",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "#5E35B1",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#4527A0",
            },
          },
        },
      },
    },
  },
});

export default theme;
