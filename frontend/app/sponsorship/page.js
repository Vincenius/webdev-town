import React from 'react'
import Image from 'next/image'
import style from './page.module.css'
import adam from '../../public/adam.jpg'
import lucian from '../../public/lucian.jpg'
import { openGraph, twitter } from '../../utils/metadata';

const title = "WebDev Town | Sponsorship"
const description = "Promote your product, ebook, or SaaS on WebDev Town."
const url = "https://webdev.town/sponsorship"

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


const Sponsorship = () => {
    return <div className={style.container}>
      <h2>Become a Sponsor of WebDev Town</h2>
      <p>
        WebDev Town is a website + newsletter for web developers / designers and indie hackers.
      </p>
      <p>
        Do you have a product, ebook, or SaaS you want to promote?
        Pass me an email at <a href="mailto:info@webdev.town">info@webdev.town</a> if you are interested.
      </p>

      <h3>What does it include?</h3>
      <div>📧 A prominent spot in the <a href="https://preview.mailerlite.com/h2i0o3y2o2" target="_blank" rel="noopener noreferrer">E-Mail newsletter</a>
        <ul>
          <li><b>600+</b> subscribers</li>
          <li><b>~ 45%-50%</b> Open rate</li>
          <li>CTR <b>~15%</b></li>
        </ul>
      </div>
      <div>🌐 A link on the landing page of <a href="https://webdev.town/" target="_blank" rel="noopener noreferrer">WebDev Town</a> for one week.</div>
      <div>🐤 A shoutout on <a href="https://twitter.com/wweb_dev/status/1585143891938115584" target="_blank" rel="noopener noreferrer">Twitter</a> to <b>900+</b> followers</div>

      <div className={style.quotes}>
        <blockquote>
          ”Vincent&apos;s newsletter emphasizes quality over quantity, attracting dedicated and valuable subscribers to my newsletter. I highly recommend collaboration with him!”
          <p>
            <Image className={style.quoteImage} src={adam} alt="Adam" width={30} height={30} />
            <span>Adam from <a href="https://unicornclub.dev">UnicornClub.dev</a></span>
          </p>
        </blockquote>
        <blockquote>
          ”It&apos;s my pleasure to sponsor the WebDev Town newsletter. Having my product featured in it brought relevant traffic my way and a healthy backlink.”
          <p>
            <Image className={style.quoteImage} src={lucian} alt="Lucian" width={30} height={30} />
            <span>Lucian from <a href="https://devluc.com">devluc.com</a></span>
          </p>
        </blockquote>
      </div>

      <h3>How much is it?</h3>
      <p>
        It&apos;s <b>$30</b> for the whole package. With 30-50 estimated clicks this makes an estimated CPC of <b>$0.60 - $1</b>.
      </p>

      <p>
        If you have any questions feel free to reach out at <a href="mailto:info@webdev.town">info@webdev.town</a> or <a href="https://twitter.com/wweb_dev" target="_blank" rel="noopener noreferrer">Twitter</a>.
      </p>
    </div>
}

export default Sponsorship
