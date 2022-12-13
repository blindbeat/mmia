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
        root: ({ ownerState, theme }) => ({
          ":before": {
            borderBottomColor: `${theme.palette.grey[700]} !important`,
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          textTransform: "capitalize",
          color: theme.palette.grey[600],
          // ...(ownerState.shrink && {}),
        }),
      },
    },
  },
})
