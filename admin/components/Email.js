import React, { useState } from 'react'
import { Button, Textarea } from '@mantine/core';
import { DateInput } from '@mantine/dates';

const defaultText = 'If you have any feedback or you want to share tools and resources for the next newsletter - just answer to this email.'

const Email = () => {
  const [intro, setIntro] = useState(defaultText)
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(null) // todo read from local storage

  const getEmail = async () => {
    setLoading(true)
    const { result } = await fetch('/api/generate-email', {
      method: 'POST',
      body: JSON.stringify({
        intro: intro.replace(/(?:\r\n|\r|\n)/g, '<br>'),
        date: date.toISOString(),
      })
    }).then(res => res.json())

    console.log(result)
    navigator.clipboard.writeText(result).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });
    // todo success message
    // todo store tomorrow date in local storage

    setLoading(false)
  }

  return <div>
    <DateInput
      value={date}
      onChange={setDate}
      label="From date"
      placeholder="From date"
      maw={400}
      mb="md"
    />
    <Textarea
      placeholder="Email Intro"
      label="Email Intro"
      withAsterisk
      mb="md"
      value={intro}
      onChange={e => setIntro(e.currentTarget.value)}
    />
    <Button onClick={getEmail} loading={loading}>Generate Email</Button>
  </div>
}

export default Email
