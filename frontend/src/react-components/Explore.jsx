import React, { useState } from 'react'
import styles from './Explore.module.css'

const Card = ({ href, title, body, image }) => {
  const domain = (new URL(href))
  return <li className="link-card">
    <a href={href} target="_blank" rel="noopener noreferrer" draggable="false">
      <img
        src={image}
        alt={title}
        className="image"
      />
      <div className="content">
        <div>
          <h3>
            {title}
            <span>&rarr;</span>
          </h3>
          <p>
            {body}
          </p>
        </div>
        <p className="host">
          {domain.hostname}
        </p>
      </div>
    </a>
  </li>
}

const LoadingCard = () => {
  return <li className="link-card no-hover">
    <div className={styles.skeleton}></div>
    <div className="content">
      <div>
        <h3>
          <span className={styles.skeletonText} style={{ width: '75%' }}></span>
        </h3>
        <p>
          <span className={styles.skeletonText}></span>
          <span className={styles.skeletonText}></span>
          <span className={styles.skeletonText} style={{ width: '25%' }}></span>
        </p>
      </div>
    </div>
  </li>
}

const Explore = ({ optimizedImages, initialData, initialTotal }) => {
  const [data, setData] = useState(initialData)
  const [isLoading, setIsLoading] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(initialTotal)

  const handleSeachChange = (e) => {
    setSearchVal(e.target.value)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  };

  const handleSearch = async () => {
    setData([])
    setIsLoading(true)

    const response = await fetch(`${import.meta.env.PUBLIC_API_URL}?q=${searchVal}`).then(res => res.json())
    const { result, page: newPage, total } = response

    setData(result)
    setPage(parseInt(newPage))
    setTotal(total)
    setIsLoading(false)
  }

  const loadMore = async () => {
    setIsLoading(true)

    const query = `?${searchVal ? `q=${searchVal}` : ''}&page=${page + 1}`
    const response = await fetch(`${import.meta.env.PUBLIC_API_URL}${query}`).then(res => res.json())
    const { result, page: newPage, total } = response

    setData([ ...data, ...result ])
    setPage(parseInt(newPage))
    setTotal(total)
    setIsLoading(false)
  }

  return <div style={{ minHeight: '75vh' }}>
    <div style={{ display: 'flex', marginBottom: '2em' }}>
      <input
        type="text"
        placeholder="Search"
        style={{ marginRight: '1em' }}
        onChange={handleSeachChange}
        onKeyPress={handleKeyPress}
      ></input>
      <button type="submit" className="button" onClick={handleSearch}>
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"/></svg>
      </button>
    </div>

    { data.length === 0 && !isLoading && <h3>
      Could not find any resources matching your search.
    </h3>}

    { data.length > 0 && <ul role="list" className="link-card-grid">
      {data.map((elem, i) => {
        const imagePath = elem.image.replace('/weekly', '../assets');
        const image = (optimizedImages.find(i => i.path === imagePath) || {}).image || '/social.png'

        return <Card
          key={elem.title + i}
          href={elem.link}
          title={elem.title}
          body={elem.description}
          image={image}
        />
      })}
    </ul> }

    { isLoading === true && <ul role="list" className="link-card-grid">
      { Array.from(Array(12).keys()).map((i) => <LoadingCard key={i} />) }
    </ul>}

    {(page * 48) < total &&
      <button className="button" onClick={loadMore} style={{ margin: '0 auto', width: '260px', height: '3.5em' }}>
        LOAD MORE
      </button>
    }
  </div>
}

export default Explore
