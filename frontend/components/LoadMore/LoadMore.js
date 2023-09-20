'use client'

import React, { useState } from 'react'
import { Button } from '@mantine/core'
import CardGrid from '../Card/CardGrid'

const LoadMore = ({ count, tag }) => {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const resourceCount = page * 48

  const loadMore = async () => {
    setIsLoading(true)
    fetch(`/api?page=${page}&${tag ? '&tag=' + tag : ''}`)
      .then(res => res.json())
      .then(result => {
        setData([...data, ...result])
        setPage(page + 1)
      })
      .then(() => setIsLoading(false))
  }

  return <>
    <CardGrid data={data} />
    {/* todo loading grid */}
    { resourceCount < count && <Button
      size="xl" mt="xl" loading={isLoading}
      onClick={loadMore}
      style={{ margin: 'auto', display: 'block', padding: '0 5rem' }}
    >
      Load more
    </Button> }
  </>
}

export default LoadMore
