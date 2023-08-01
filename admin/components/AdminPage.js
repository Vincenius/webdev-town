import React, { useState } from 'react'
import { Title, TextInput, Flex, Button, Image, FileInput } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import styles from './AdminPage.module.css'

const AdminPage = () => {
  const [weekly, setWeekly] = useLocalStorage({ key: 'webdev-town-weekly', defaultValue: '' });
  const [url, setUrl] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [uploadImage, setUploadImage] = useState()
  const [loading, setLoading] = useState(false)

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
        weekly,
        url,
        title,
        description,
        image: imagePath,
      })
    }).then(res => res.json())
    console.log(result)
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
    console.log(result)
  };

  return <main className={styles.main}>
    <Title order={1}>Admin Page</Title>

    <TextInput
      placeholder="wwebdev weekly (legacy)"
      label="weekly"
      withAsterisk
      value={weekly}
      onChange={(event) => setWeekly(event.currentTarget.value)}
      mb="md"
    />

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

    <FileInput
      placeholder="Image file"
      label="Image"
      value={uploadImage}
      onChange={uploadFile}
      mb="sm"
    />
    <Image src={image} alt="preview" />

    {/* date -> next seven days with number of resources for that day */}

    <Button onClick={() => submit()} loading={loading}>Submit</Button>

    {/* later generate twitter message */}
  </main>
}

export default AdminPage
