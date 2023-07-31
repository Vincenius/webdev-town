import Document, { Html, Head, Main, NextScript } from 'next/document'
import { createGetInitialProps } from '@mantine/next'

const getInitialProps = createGetInitialProps()

export default class _Document extends Document {
  static getInitialProps = getInitialProps

  render() {
    return (
      <Html>
        <Head />
        <body>
          <noscript>
            <p>
              This application requires JavaScript to be enabled in your browser.
            </p>
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
