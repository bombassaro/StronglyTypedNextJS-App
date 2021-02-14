import App from 'next/app';
import React from 'react';

import {theme} from 'options/theme'
import {ThemeProvider} from 'styled-components'

export default ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <Component {...pageProps} />
</ThemeProvider>
)