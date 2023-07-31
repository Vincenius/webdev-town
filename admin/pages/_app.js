import Head from 'next/head'
import { MantineProvider } from '@mantine/core';
export default function App(props) {
  const {
    Component,
    pageProps,
  } = props
  return (
    <>
      <Head>
        <title>WebDev Town Admin Interface</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
        <meta name='robots' content='index, nofollow'></meta>
        <meta charSet='utf-8'></meta>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'dark' }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  )
}
