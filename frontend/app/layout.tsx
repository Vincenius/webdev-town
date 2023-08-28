import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";

import './global.css';
import Navigation from '../components/Navigation/Navigation'
import Footer from '../components/Footer/Footer'
import { openGraph, twitter } from '../utils/metadata';

const theme = {
  // primaryColor: 'todo'
  colorScheme: 'dark',
  colors: {
    // override dark colors to change them for all components
    dark: [
      '#fff',
      '#A6A7AB',
      '#909296',
      '#5c5f66',
      '#373A40',
      '#2C2E33',
      '#25262b',
      '#1A1B1E',
      '#141517',
      '#101113'
    ],
  },
}

const title = "WebDev Town | A curated list of web development tools, articles, libraries, and resources that gets updated every day"
const description = "A curated list of web development tools, articles, libraries and more. It gets updated every day."
const name = "WebDev Town"
const image = "https://webdev.town/social.png"
const url = "https://webdev.town"

export const metadata = {
  title,
  description,
  generator: 'Next.js',
  applicationName: name,
  keywords: ['JavaScript', 'Web Development', 'Tools', 'Resources', 'Articles', 'Next.js', 'React', 'Libraries', 'Newsletter'],
  authors: [{ name: 'Vincent Will' }],
  colorScheme: 'dark',
  creator: 'Vincent Will',
  publisher: 'Vincent Will',
  metadataBase: new URL(url),
  openGraph,
  twitter,
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
        <link rel="shortcut icon" href="/favicon.svg" />
      </head>
      <body>
        <main>
          <Navigation />
          <MantineProvider
            defaultColorScheme="dark"
            theme={theme}
          >
            {children}
          </MantineProvider>
          <Footer />
        </main>
      </body>
    </html>
  );
}
