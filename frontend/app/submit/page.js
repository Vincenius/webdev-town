'use client'

import React, { useState } from 'react'
import { TextInput } from '@mantine/core';
import style from './page.module.css'
import { submit } from './actions'
import Button from './Button'

const Submit = () => {
  const [success, setSuccess] = useState(null)

  function handleSubmit(formData) {
    submit(formData).then((res) => {
      setSuccess(res.success)
    })
  }

  return <div>
    <div>
      <p>
        Do you want to share your latest web project or something that you found online?
        To be added to WebDev Town your resource should:
      </p>

      <ul>
        <li>be relevant for web developers / designers</li>
        <li>be free</li>
      </ul>

      <p>
        If you want to promote your startup or commercial project, you should take a look at the <a href="/sponsorship">sponsorship</a> option of the newsletter.
      </p>
    </div>

    {success !== true && <form action={handleSubmit} className={style.container}>
      <h3>Submit Resource</h3>
      <TextInput
        name="link"
        placeholder="https://example.com/resource"
        type="text"
        required
        label="Resource link"
        mb="md"
      />
      <TextInput
        name="email"
        placeholder="your-email@example.com"
        type="email"
        label="Your email (optional)"
        mb="md"
      />
      <TextInput
        name="message"
        placeholder="Some additional infos for your resource"
        type="text"
        label="Message (optional)"
        mb="lg"
      />

      <Button />

      { success === false && <p>Something went wrong. Please try again or message <a href="mailto:info@webdev.town">info@webdev.town</a></p>}
    </form> }
    { success && <div className={`${style.container} ${style.success}`}>
      <h3>Successfully submitted resource!</h3>

      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M0 0h24v24H0z"/><path fill="currentColor" d="M17 3.34a10 10 0 1 1-14.995 8.984L2 12l.005-.324A10 10 0 0 1 17 3.34zm-1.293 5.953a1 1 0 0 0-1.32-.083l-.094.083L11 12.585l-1.293-1.292l-.094-.083a1 1 0 0 0-1.403 1.403l.083.094l2 2l.094.083a1 1 0 0 0 1.226 0l.094-.083l4-4l.083-.094a1 1 0 0 0-.083-1.32z"/></g></svg>
    </div> }
  </div>
}

export default Submit
