import React from 'react'
import { Box } from '@mantine/core'
import Card from './Card'
import style from './CardGrid.module.css'

const CardGrid = ({ data, hideDate = false }) => {
  return <Box className={style.linkCardGrid}>
    {data.map((elem, i) => <Card
      key={elem.title + i}
      href={elem.link}
      title={elem.title}
      body={elem.description}
      image={elem.image}
      internal={elem.internal}
      sponsored={elem.sponsored}
      date={hideDate ? null : elem.created_at}
    />)}
  </Box>
}

export default CardGrid
