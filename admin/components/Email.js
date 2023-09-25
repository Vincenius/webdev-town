import React, { useState } from 'react'
import { Button, Textarea, Flex, NumberInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';

const defaultText = 'If you have any feedback or you want to share tools and resources for the next newsletter - just answer to this email.'

const Email = () => {
  const today = new Date()
  today.setUTCHours(3, 0, 0, 0)
  const [intro, setIntro] = useState(defaultText)
  const [loading, setLoading] = useState(false)
  const [fromDate, setFromDate] = useState(null) // todo read from local storage
  const [toDate, setToDate] = useState(today)
  const [number, setNumber] = useState(166)

  const getEmail = async () => {
    setLoading(true)
    const { result } = await fetch('/api/generate-email', {
      method: 'POST',
      body: JSON.stringify({
        intro: intro.replace(/(?:\r\n|\r|\n)/g, '<br>'),
        fromDate: fromDate.toISOString(),
        toDate: toDate.toISOString(),
        number,
      })
    }).then(res => res.json())

    navigator.clipboard.writeText(result).then(function() {
      console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
      console.error('Async: Could not copy text: ', err);
    });

    setLoading(false)
  }

    const getMarkdown = async () => {
      setLoading(true)
      const { result } = await fetch('/api/generate-markdown', {
        method: 'POST',
        body: JSON.stringify({
          intro: intro.replace(/(?:\r\n|\r|\n)/g, '<br>'),
          fromDate: fromDate.toISOString(),
          toDate: toDate.toISOString(),
          number,
        })
      }).then(res => res.json())

      navigator.clipboard.writeText(result).then(function() {
        console.log('Async: Copying to clipboard was successful!');
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });

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
    <NumberInput
      label="Number"
      value={number}
      onChange={val => setNumber(val)}
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
    <Flex>
      <Button onClick={getEmail} loading={loading} mr="md">Generate Email</Button>
      <Button onClick={getMarkdown} loading={loading}>Generate Markdown</Button>
    </Flex>
  </div>
}

export default Email
