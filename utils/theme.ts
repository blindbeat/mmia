import { createTheme } from "@mui/material"

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#fff",
    },
  },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "standard",
        fullWidth: true,
      },
      styleOverrides: {},
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          marginBottom: "0.5rem",
        },
        root: ({ theme }) => ({
          ":before": {
            borderBottomColor: `${theme.palette.grey[700]} !important`,
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.grey[600],
        }),
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          textAlign: "right",
          color: "white !important",
          opacity: 1,
          fontSize: "0.625rem",
        },
      },
    },
  },
})
