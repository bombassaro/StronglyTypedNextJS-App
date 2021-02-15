import React from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import {ServerStyleSheet} from 'styled-components';

interface Props {
  styleTags: any
}
class App extends Document<Props> {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage((AppComponent) => (props) =>
      sheet.collectStyles(<AppComponent {...props} />),
    )
    const styleTags = sheet.getStyleElement()
    return {...page, styleTags}
  }
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8'/>
          <meta httpEquiv="x-dns-prefetch-control" content="on" />
          <meta httpEquiv='x-ua-compatible' content='ie=edge'/>
          <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
          <style amp-custom="" dangerouslySetInnerHTML={this.props.styleTags[0].props.dangerouslySetInnerHTML}/>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
export default App;