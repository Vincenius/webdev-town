import React, { useState } from 'react'
import useSWR from 'swr'
import { TextInput, Flex, Button, Image, FileInput, Notification, Checkbox, MultiSelect } from '@mantine/core';
import { tagData } from '../utils/constants'

const collectionOptions = [
  { value: 'backgrounds', label: 'Backgrounds' },
];

const fetcher = (...args) => fetch(...args).then(res => res.json())

const AdminPage = () => {
  const { data, error, isLoading } = useSWR('/api/data', fetcher)
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [uploadImage, setUploadImage] = useState()
  const [loading, setLoading] = useState(false)
  const [screenshotLoading, setScreenshotLoading] = useState(false)
  const [sponsored, setSponsored] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [collections, setCollections] = useState([])
  const [tags, setTags] = useState([])

  const uploadFile = file => {
    const preview = URL.createObjectURL(file)
    setUploadImage(file)
    setImage(preview)
  }

  const submit = async () => {
    setLoading(true)
    let imagePath = image
    if (uploadImage) {
      const formData = new FormData();
      formData.append('file', uploadImage);
      const storedFile = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      }).then(res => res.json())
      imagePath = storedFile.path
    }
    const { result } = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify({
        url,
        title,
        description,
        image: imagePath,
        created_at: createdAt,
        sponsored,
        collections,
        tags,
      })
    }).then(res => res.json())

    setShowSuccess(true)
    setLoading(false)
  }

  const fetchMeta = async () => {
    setLoading(true)
    const { result } = await fetch(`/api/get-meta?url=${encodeURI(url)}`).then(res => res.json())
    const image = (result.ogImage && result.ogImage.length > 0 && result.ogImage[0].url) ||
      (result.twitterImage && result.twitterImage.length > 0 && result.twitterImage[0].url)
    setTitle(result.ogTitle)
    setDescription(result.ogDescription)
    setImage(image)
    setLoading(false)
  };

  const fetchScreenshot = async () => {
    setScreenshotLoading(true)
    const { path } = await fetch(`/api/screenshot?url=${encodeURI(url)}`).then(res => res.json())
    setImage(path)
    setScreenshotLoading(false)
  }

  return <>
    <Flex align="flex-end" mb="md">
      <TextInput
        placeholder="URL"
        label="URL"
        withAsterisk
        value={url}
        onChange={(event) => setUrl(event.currentTarget.value)}
        style={{ width: '100%' }}
      />
      <Button onClick={() => fetchMeta()} loading={loading}>Fetch</Button>
    </Flex>

    <TextInput
      placeholder="Title"
      label="Title"
      withAsterisk
      value={title}
      onChange={(event) => setTitle(event.currentTarget.value)}
      mb="md"
    />

    <TextInput
      placeholder="Description"
      label="Description"
      withAsterisk
      value={description}
      onChange={(event) => setDescription(event.currentTarget.value)}
      mb="md"
    />

    <MultiSelect
      data={tagData.map(t => ({ value: t, label: t }))}
      label="Tags"
      placeholder="Tags"
      mb="xs"
      value={tags}
      onChange={setTags}
    />

    <MultiSelect
      data={collectionOptions}
      label="Collections"
      placeholder="Collections"
      mb="md"
      value={collections}
      onChange={setCollections}
    />

    <Checkbox
      label="Sponsored"
      mb="sm"
      checked={sponsored}
      onChange={(event) => setSponsored(event.currentTarget.checked)}
    />

    <FileInput
      placeholder="Image file"
      label="Image"
      value={uploadImage}
      onChange={uploadFile}
      mb="sm"
    />

    <Button
      mb="sm"
      loading={screenshotLoading}
      onClick={fetchScreenshot}
    >
      Screenshot
    </Button>


    { image && <Image src={image.replace('./public', '')} alt="" /> }

    { isLoading && <div>Loading....</div> }
    { !isLoading && <Flex wrap="wrap" mb="md">
      { Array.from(Array(14).keys()).map((i) => {
        const date = new Date()
        const randomMs = Math.floor(Math.random() * 1000)
        date.setDate(date.getDate() + i)
        date.setUTCHours(2, 0, 0, randomMs)
        const dateData = (data || []).filter(elem => date.toISOString().substring(0,10) === elem.created_at.substring(0,10))
        const color = createdAt.substring(0,10) === date.toISOString().substring(0,10)
          ? 'blue'
          : (dateData.length > 1) ? 'green' : dateData.length === 1 ? 'yellow' : 'red'
        const hasSponsored = dateData.filter(a => a.sponsored).length > 0
        return <Button
          key={i}
          m="xs" p="xs" color={color} variant={hasSponsored ? 'filled' : "light" }
          onClick={() => setCreatedAt(date.toISOString())}
        >
          {date.toLocaleDateString('de-DE', { weekday: "short" })} -&nbsp;
          {date.toLocaleDateString('de-DE')} ({dateData.length})
        </Button>
      }) }
      <Button
        m="xs" p="xs" variant='light'
        onClick={() => {
          const future = new Date()
          const randomMs = Math.floor(Math.random() * 1000)
          future.setFullYear(2099)
          future.setUTCHours(2, 0, 0, randomMs)
          console.log(future.toISOString())
          setCreatedAt(future.toISOString())
        }}
      >
        FUTURE
      </Button>
    </Flex>}

    <Button onClick={() => submit()} loading={loading}>Submit</Button>

    {showSuccess && <Notification title="SUCCESS!!!!"
      color="teal"
      onClose={() => setShowSuccess(false)}
      style={{ position: "fixed", top: '50px', left: '50%', width: '50%', transform: 'translateX(-50%)' }}>
      Successfully created entry
    </Notification> }
  </>
}

export default AdminPage
