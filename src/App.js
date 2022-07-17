import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer, whitespace } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import Container from './components/Container';
import './assets/styles/main.css';
import { Helmet } from 'react-helmet';


function App() {
  const [colorMode, setColorMode] = React.useState('dark');

  const theme = createTheme({
    direction: 'rtl',
    typography: {
      fontFamily: 'shabnam',
      fontSize: 13
    },
    palette: {
      mode: colorMode,
      primary: {
        light: '#bdbdbd',
        main: '#9e9e9e',
        dark: '#757575',
        contrastText: '#fff',
      },
      secondary: {
        light: '#f5f5f5',
        main: '#fafafa',
        dark: '#eeeeee',
        contrastText: '#fff',
      }
    }
  });

  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });

  
  return (
    <>
    <Helmet>
      <style>{`body { background-color: ${colorMode === 'dark' ? '#222222' : 'white'}; }`}</style>
    </Helmet>
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <Container colorMode={colorMode} setColorMode={setColorMode} />
      </ThemeProvider>
    </CacheProvider>
    </>
  );
}

export default App;
