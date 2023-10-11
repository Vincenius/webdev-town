import React from 'react'
import Link from 'next/link'

const Thanks = () => {
  return <div>
    <h1>Thank you for subscribing!</h1>

    <h3>📅 What to Expect:</h3>
    <p>Every <b>Wednesday morning</b>, I&apos;ll send you an e-mail with the most valuable web development resources right to your inbox.</p>

    <h3>📚 Check Out What&apos;s Already Here:</h3>
    <p>
      Can&apos;t wait for the next issue? You can find all previous resources and some useful collections on the website:
    </p>
    <p>
      <Link href="/">🔗 All resources from previous issues</Link><br/>
      <Link href="/collections/backgrounds">🖼 Ultimate Collection Of Websites For Creative Backgrounds</Link><br/>
      <Link href="/collections/icons">💻 A Curated List Of Websites For Free Icon Sets</Link>
    </p><br/>
    <p>Cheers,<br/>Vincent</p>
  </div>
}

export default Thanks
