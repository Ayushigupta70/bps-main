import React from "react";
import MainRouter from "./router/MainRouter";
import { CssBaseline, ThemeProvider } from "@mui/material";
import AppTheme from "./Theme/AppTheme";

const App = () => {
  return (
    <ThemeProvider theme={AppTheme}>
      <CssBaseline />
      <MainRouter />
    </ThemeProvider>
  );
};

export default App;
