import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import style from './Card.module.css'

const LinkComp = ({ href, internal, children }) => internal
  ? <Link href={href}>{children}</Link>
  : <a href={href} target="_blank" rel="noopener noreferrer" draggable="false">{children}</a>

const Card = ({ href, title, body, image, internal, date, sponsored }) => {
  const domain = !internal
    ? (new URL(href))
    : ''
  const imagePath = image
    .replace('../assets/', '/')
    .replace('/weekly', '')

  return <div className={style.card}>
    <LinkComp href={href} internal={internal}>
      <Image
        src={imagePath}
        alt={title}
        className={style.image}
        // todo blur images: https://github.com/evanw/thumbhash/blob/main/examples/browser/index.html
        // placeholder="blur"
        // blurDataURL=""
        width={300}
        height={157}
      />
      <div className={style.content}>
        <div>
          {sponsored && <span className={style.sponsored}>Sponsored</span>}
          <h3>
            {title}
            <span>&rarr;</span>
          </h3>
          <p>
            {body}
          </p>
        </div>
      </div>
      { !internal && <p className={style.host}>
        { date && <time className={style.date}>{new Date(date).toLocaleDateString('en-US')}</time> }
        { !date && <span></span> }

        <span>{domain.hostname}</span>
      </p> }
    </LinkComp>
  </div>
}

export default Card
