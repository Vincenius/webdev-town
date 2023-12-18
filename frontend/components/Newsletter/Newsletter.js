"use client"

import React, { useState } from 'react'
import { TextInput, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import style from './Newsletter.module.css'

// https://stackoverflow.com/questions/50064898/how-can-i-integrate-a-mailerlite-com-signup-form-with-react

const Newsletter = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState('')
  const [opened, { open, close }] = useDisclosure(false);
  const submitNewsletter = (e) => {
    e.preventDefault()
    setLoading(true)

    fetch('https://email.webdev.town/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, list: 'prod' })
    })
      .then(() => open())
      .finally(() => setLoading(false))
  }

  return (<form className={style.mlSubscribeForm} onSubmit={submitNewsletter}>
    <p>Never miss a useful website again. Join <span className={style.textGradient}>1100+</span> devs and receive a <u>weekly</u> summary straight into your inbox.</p>
    <TextInput
      value={email}
      onChange={e => setEmail(e.target.value)}
      placeholder="Email" autoComplete="email" aria-label="Email"
      mb="md" required type="email"
      className={style.emailInput}
    />
    <Button type="submit" loading={loading}>Subscribe</Button>

    <Modal opened={opened} onClose={close} title="Successfully subscribed!">
      <p>Thanks for joining the newsletter!</p>
      <p>To receive the weekly emails, please <span className={style.textGradient}>confirm your subscription</span>. Please <span className={style.textGradient}>check your spam folder</span> for the confirmation email if you can&apos;t find it.</p>

      <Button onClick={close} variant="outline">Okay!</Button>
    </Modal>
  </form>)
}

export default Newsletter
