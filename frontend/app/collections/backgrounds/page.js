import React from 'react'
import Newsletter from '../../../components/Newsletter/Newsletter'
import CardGrid from '../../../components/Card/CardGrid'
import { getByQuery } from '../../../utils/database';
import { openGraph, twitter } from '../../../utils/metadata';

const title = "WebDev Town | Ultimate Collection Of Websites For Creative Backgrounds"
const description = "Spice up your website with a creative background. Use this collection of websites to generate backgrounds or to get inspiration. It includes various background generators, CSS patterns, CSS Gradients, and SVG patterns."
const url = "https://webdev.town/collections/backgrounds"
const image = "https://webdev.town/collections/backgrounds.png"

export const metadata = {
  title,
  description,
  openGraph: {
    ...openGraph,
    title,
    description,
    url,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    ...twitter,
    title,
    description,
    images: [image],
  },
};

async function getData() {
  const query = {
    collections: 'backgrounds'
  };
  const data = await getByQuery({ query })
  const sortedData = data.sort((a, b) => a.title.localeCompare(b.title))
  return sortedData
}

const Backgrounds = async () => {
  const data = await getData()

  return <div>
    <h2>Ultimate Collection Of Websites For Creative Backgrounds</h2>
    <p style={{ marginBottom: '1em' }}>
      Spice up your website with a creative background. Use this collection of websites
      to generate backgrounds or to get inspiration. It includes various background generators,
      CSS patterns, CSS Gradients, and SVG patterns.
    </p>

    <Newsletter />

    <CardGrid data={data} hideDate={true} />
  </div>
}

export default Backgrounds
