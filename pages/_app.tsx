import React from 'react';

import { theme } from 'utils/theme'
import { ThemeProvider } from 'styled-components'

export default function MyApp ({ Component, pageProps }) {
  
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
