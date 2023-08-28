import React from 'react'
import Image from 'next/image'
import style from './page.module.css'
import me from '../../public/me.jpg'
import { openGraph, twitter } from '../../utils/metadata';

const title = "WebDev Town | About"
const description = "Hey I'm Vincent and I run WebDev Town and curate all the resources. I add all the links I find interesting. My focus lies on JavaScript, CSS ..."
const url = "https://webdev.town/about"

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

const About = () => {
  return <div>
    <h2>About</h2>
    <div className={style.container}>
      <div>
        <p>Hey I'm Vincent and I run WebDev Town and curate all the resources.</p>
        <p>
          I add all the links I find interesting. My focus lies on JavaScript, CSS, React and various tools.
          I started collecting links in 2018 and published them as a weekly newsletter on my blog <a href="https://wweb.dev">wweb.dev</a>.
        </p>
        <p>
          In August 2023 I decided to put more effort into this curated list and created WebDev Town.
        </p>
        <p>
          You can find me and reach out on
        </p>
        <ul>
          <li><a href="https://vincentwill.com">vincentwill.com</a></li>
          <li><a href="https://twitter.com/wweb_dev">Twitter</a></li>
          <li><a href="mailto:info@webdev.tow">info@webdev.town</a></li>
        </ul>
        <p>Looking forward to hearing from you,<br/>Vincent</p>
      </div>
      <Image width={260} alt="a picture of vincent will with a guitar" src={me} />
    </div>
  </div>
}

export default About
