import React from 'react'
import Newsletter from '../../../components/Newsletter/Newsletter'
import CardGrid from '../../../components/Card/CardGrid'
import { getByQuery } from '../../../utils/database';
import { openGraph, twitter } from '../../../utils/metadata';

const title = "WebDev Town | A Curated List Of Websites For Free Icon Sets"
const description = "A handpicked selection of websites that provide free icons, ranging from simple and elegant to intricate and detailed."
const url = "https://webdev.town/collections/icons"
const image = "https://webdev.town/collections/icons-social.png"

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
    collections: 'icons'
  };
  const data = await getByQuery({ query })
  const sortedData = data.sort((a, b) => a.title.localeCompare(b.title))
  return sortedData
}

const Backgrounds = async () => {
  const data = await getData()

  // console.log(data.map(item => `[*${item.title}*](${item.link}) \- ${item.description}`).join('\n\n'))

  return <div>
    <h2>A Curated List Of Websites For Free Icon Sets</h2>
    <p style={{ marginBottom: '1em' }}>
      Below you will find a handpicked selection of websites that provide free icons.
      With options ranging from simple and elegant to intricate and detailed, these platforms offer a diverse array of icons that can add that extra visual appeal to your work.
    </p>

    <Newsletter />

    <CardGrid data={data} hideDate={true} />
  </div>
}

export default Backgrounds
