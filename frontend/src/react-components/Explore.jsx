import React, { useState } from 'react'
import styles from './Explore.module.css'
import party from "party-js";

	// const getFavs = () => {
	// 	const storedFavs = localStorage.getItem('favourites');
	// 	const favs = JSON.parse(storedFavs) || [];
	// 	return favs
	// }

	// const initFavs = getFavs();
	// initFavs.forEach(element => {
	// 	console.log('yoyo', element)
	// 	// todo mark as active
	// });

	// const buttons = document.querySelectorAll('.favourite');
  // buttons.forEach((button) => {
	// 	button.addEventListener("click", function (e) {
	// 		party.confetti(this);
	// 		button.classList.toggle('active')
	// 		console.log(this.dataset)
	// 		// const prevFavs = getFavs()
	// 		// localStorage.setItem('favourites', JSON.stringify(
	// 		// 	// [...prevFavs]
	// 		// ))
	// 		// TODO database
	// 		button.innerHTML = '1'
	// 	});
  // });

const Card = ({ href, title, body, image, date }) => {
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
        <div className="bottom">
          <span>
            {new Date(date).toLocaleDateString()}
          </span>
          <span>
            {domain.hostname}
          </span>
        </div>
      </div>
    </a>
    {/* <div className={styles.favourite}>
      0
    </div> */}
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
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(initialTotal)

  const loadMore = async () => {
    setIsLoading(true)

    const query = `?page=${page + 1}`
    const response = await fetch(`${import.meta.env.PUBLIC_API_URL}${query}`).then(res => res.json())
    const { result, page: newPage, total } = response

    setData([ ...data, ...result ])
    setPage(parseInt(newPage))
    setTotal(total)
    setIsLoading(false)
  }

  return <div style={{ minHeight: '75vh' }}>
    { data.length === 0 && !isLoading && <h3>
      Could not find any resources matching your search.
    </h3>}

    {/* TODO if sort by date then show "today, 7days, june ...." */}
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
          date={elem.created_at}
        />
      })}

      { isLoading === true && <>
        { Array.from(Array(12).keys()).map((i) => <LoadingCard key={i} />) }
      </>}
    </ul> }

    {(initialData.length + ((page - 1) * 48)) < total &&
      <button
        className="button"
        onClick={loadMore}
        style={{ margin: '0 auto', width: '260px', height: '3.5em' }}
      >
        LOAD MORE
      </button>
    }
  </div>
}

export default Explore
