import React, { useState } from 'react'
import { Button, Textarea, Flex } from '@mantine/core';
import { DateInput } from '@mantine/dates';

const defaultText = 'If you have any feedback or you want to share tools and resources for the next newsletter - just answer to this email.'

const Email = () => {
  const today = new Date()
  today.setUTCHours(3, 0, 0, 0)
  const [intro, setIntro] = useState(defaultText)
  const [loading, setLoading] = useState(false)
  const [fromDate, setFromDate] = useState(null) // todo read from local storage
  const [toDate, setToDate] = useState(today)

  const getEmail = async () => {
    setLoading(true)
    const { result } = await fetch('/api/generate-email', {
      method: 'POST',
      body: JSON.stringify({
        intro: intro.replace(/(?:\r\n|\r|\n)/g, '<br>'),
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
      })
    }).then(res => res.json())

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
  <Flex>
    <DateInput
      value={fromDate}
      onChange={date => {
        date.setUTCHours(1, 0, 0, 0) // include selected day
        setFromDate(date)
      }}
      label="From date"
      placeholder="From date"
      maw={400}
      mb="md"
    />
    <DateInput
      value={toDate}
      onChange={date => {
        date.setUTCHours(3, 0, 0, 0) // include selected day
        setToDate(date)
      }}
      label="To date"
      placeholder="To date"
      maw={400}
      mb="md"
    />
  </Flex>

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
