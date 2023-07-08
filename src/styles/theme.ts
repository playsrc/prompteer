import { createTheme } from "@mui/material";
import { RefineThemes } from "@refinedev/mui";

export const lightTheme = createTheme({
  ...RefineThemes.Blue,
  palette: {
    ...RefineThemes.Blue.palette,
    primary: {
      main: "#44d0c7",
    },
    secondary: {
      main: "#2f82f1",
    },
    background: {
      default: "#f3f6f9",
    },
  },
});

export const darkTheme = createTheme({
  ...RefineThemes.BlueDark,
  palette: {
    ...RefineThemes.BlueDark.palette,
    primary: {
      main: "#44d0c7",
    },
    secondary: {
      main: "#2f82f1",
    },
    background: {
      default: "#0d1117",
      paper: "#161b22",
    },
  },
});
