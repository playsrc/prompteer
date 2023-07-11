import { createTheme } from "@mui/material";
import { RefineThemes } from "@refinedev/mui";

import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
});

export const lightTheme = createTheme({
  ...RefineThemes.Blue,
  typography: {
    allVariants: {
      fontFamily: inter.style.fontFamily,
    },
  },
  palette: {
    ...RefineThemes.Blue.palette,
    primary: {
      main: "#1976d2",
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
  typography: {
    allVariants: {
      fontFamily: inter.style.fontFamily,
    },
  },
  palette: {
    ...RefineThemes.BlueDark.palette,
    primary: {
      main: "#42a5f5",
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
