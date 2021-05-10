import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

import { FileProvider } from "./contexts/FileContext";

import Navbar from "./components/Navbar";
import MainContainer from "./components/MainContainer";
import Footer from "./components/Footer";

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700
  }
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <FileProvider>
        <Navbar />
        <MainContainer />
      </FileProvider>
      <Footer />
    </ThemeProvider>
  );
}

export default App
