import { Title, Box } from '@mantine/core'
import Link from 'next/link'
import style from './page.module.css'
import { getByAggregation, getByQuery, getCount } from '../utils/database';
import Newsletter from '../components/Newsletter/Newsletter';
import CardGrid from '../components/Card/CardGrid';
import LoadMore from '../components/LoadMore/LoadMore';

const tags = {
  "Latest": "Latest",
  "JavaScript": "JavaScript",
  "CSS": "CSS",
  "Tool": "Tools",
  "React": "React",
  "Article": "Articles",
  "Design": "Design",
  "Library": "Libraries",
  "Other": "Other"
}

async function getData() {
  const today = new Date();
  const query = {
    created_at: {
      $lte: today.toISOString(),
    },
  };
  const latest = await getByQuery({ query, limit: 3 })

  const aggregation = [
    {
      $match: {
        created_at: {
          $lte: today.toISOString(),
        },
        _id: {
          $nin: latest.map(item => item._id),
        }
      }
    },
    {
      $sort: { created_at: -1 }
    },
    {
      $unwind: "$tags"
    },
    {
      $group: {
        _id: "$tags",
        elements: { $push: "$$ROOT" }
      }
    },
    {
      $project: {
        _id: 0,
        tag: "$_id",
        elements: {
          $slice: ["$elements", 3]  // Get the first three elements for each tag
        }
      }
    },
  ]

  const [data, count] = await Promise.all([
    getByAggregation({ aggregation }),
    getCount(),
  ])

  const result = [
    {
      tag: 'Latest',
      elements: latest,
    },
    ...data,
  ]

  return { data: result, count }
}

export default async function HomePage() {
  const result = await getData()
  const { data, count } = result

  return <div className={style.container}>
    <Title order={2}>Discover <span className={style.textGradient}>{count}</span> Web Development Tools, Articles, Libraries and Resources!</Title>

    <Newsletter />

    { Object.entries(tags).map(([key, value]) => {
      const { elements } = data.find(i => i.tag === key)
      return <section key={key}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title order={3}>{value}</Title>
          <Link href={`/${key.toLowerCase()}`}>Show all</Link>
        </div>
        <CardGrid data={elements} />
      </section>
    }) }

    {/* <LoadMore count={count} /> */}
  </div>;
}

