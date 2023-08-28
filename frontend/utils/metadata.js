const title = "WebDev Town | A curated list of web development tools, articles, libraries, and resources that gets updated every day."
const description = "A curated list of web development tools, articles, libraries and more. It gets updated every day."
const name = "WebDev Town"
const image = "https://webdev.town/social.png"
const url = "https://webdev.town"

export const openGraph = {
  title,
  description,
  url,
  siteName: name,
  images: [
    {
      url: image,
      width: 1200,
      height: 630,
    },
  ],
  locale: 'en_US',
  type: 'website',
}

export const twitter = {
  card: 'summary_large_image',
  title,
  description,
  creator: '@wweb_dev',
  images: [image],
}