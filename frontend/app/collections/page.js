import React from 'react'
import CardGrid from '../../components/Card/CardGrid'
import { openGraph, twitter } from '../../utils/metadata';

const title = "WebDev Town | Collections of web development resources based on a category"
const description = "Here you will find collections of various web development resources based on a category."
const url = "https://webdev.town/collections"

export const metadata = {
  title,
  description,
  openGraph: {
    ...openGraph,
    title,
    description,
    url,
  },
  twitter: {
    ...twitter,
    title,
    description,
  },
};

const collections = [{
  link: "/collections/backgrounds",
  title: "Ultimate Collection Of Websites For Creative Backgrounds",
  description: "A collection of websites to generate backgrounds or to get inspiration. It includes various background generators, CSS patterns, CSS Gradients, and SVG patterns.",
  image: "../assets/collections/backgrounds.png",
  sponsored: false,
  internal: true,
}, {
  link: "/collections/icons",
  title: "A Curated List of Websites For Free Icon Sets",
  description: "A handpicked selection of websites that provide free icons, ranging from simple and elegant to intricate and detailed.",
  image: "../assets/collections/icons.png",
  sponsored: false,
  internal: true,
}]

const Collections = () => {
  return <div>
    <h2>Collections</h2>
    <p>
      Here you will find collections of various web development resources based on a category.
    </p>
    <CardGrid data={collections} />
  </div>
}

export default Collections
