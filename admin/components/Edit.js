import React, { useState } from 'react'
import useSWR from 'swr'
import { TextInput, Checkbox, Grid, Box, Button, Textarea, MultiSelect } from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { tagData } from '../utils/constants'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Resource = ({ item }) => {
  const [createdAt, setCreatedAt] = useState(new Date(item.created_at))
  const [url, setUrl] = useState(item.link)
  const [title, setTitle] = useState(item.title)
  const [description, setDescription] = useState(item.description)
  const [image, setImage] = useState(item.image)
  const [tags, setTags] = useState(item.tags || [])
  const [sponsored, setSponsored] = useState(item.sponsored)
  const [isLoading, setIsLoading] = useState(false)

  const submit = () => {
    setIsLoading(true)
    fetch('/api/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        _id: item._id,
        created_at: createdAt.toISOString(),
        link: url,
        title: title,
        description: description,
        // image: image,
        sponsored: sponsored,
        tags,
      })
    }).then(() => setIsLoading(false))
  }

  return (<Grid.Col key={item._id} span={6}>
    <Box m="xs" p="xs" bg="gray" style={{ borderRadius: '0.2em' }}>
      <DateInput
        value={createdAt}
        onChange={date => {
          date.setUTCHours(2, 0, 0, 0) // include selected day
          setCreatedAt(date)
        }}
        label="Date input"
        placeholder="Date input"
        mb="xs"
      />

      <TextInput
        placeholder="Title"
        label="Title"
        withAsterisk
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
        mb="xs"
      />

      <Textarea
        placeholder="Description"
        label="Description"
        withAsterisk
        value={description}
        onChange={(event) => setDescription(event.currentTarget.value)}
        mb="xs"
        maxRows={3}
      />

      <TextInput
        placeholder="URL"
        label="URL"
        withAsterisk
        value={url}
        onChange={(event) => setUrl(event.currentTarget.value)}
        mb="xs"
      />

      <MultiSelect
        data={tagData.map(t => ({ value: t, label: t }))}
        label="Tags"
        placeholder="Tags"
        mb="xs"
        value={tags}
        onChange={setTags}
      />

      <Checkbox
        label="Sponsored"
        mb="xs"
        checked={sponsored}
        onChange={(event) => setSponsored(event.currentTarget.checked)}
      />

      <Button onClick={submit} loading={isLoading}>Submit</Button>
    </Box>
  </Grid.Col>)
}

const Edit = () => {
  const [page, setPage] = useState(0)
  const { data, error, isLoading } = useSWR(`/api/data?all=true&page=${page}`, fetcher)

  if (isLoading || !data) return <div>Loading...</div>

  return <div>
    <Grid gutter={5}>
      { data.map(d => <Resource item={d} key={d.id} />) }
    </Grid>
    <Button onClick={() => setPage(page+1)}>Older</Button>
  </div>
}

export default Edit
