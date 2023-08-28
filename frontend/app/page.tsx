import { Title, Box } from '@mantine/core'
import style from './page.module.css'
import { getByQuery, getCount } from '../utils/database';
import Newsletter from '../components/Newsletter/Newsletter';
import CardGrid from '../components/Card/CardGrid';
import LoadMore from '../components/LoadMore/LoadMore';

async function getData() {
  const today = new Date();
  const query = {
    created_at: {
      $lte: today.toISOString(),
    },
  };
  const [data, count] = await Promise.all([
    getByQuery({ query }),
    getCount(),
  ])

  return { data, count }
}

export default async function HomePage() {
  const result = await getData()
  const { count, data } = result

  return <div className={style.container}>
    <Title order={2}>Discover <span className={style.textGradient}>{count}</span> Web Development Tools, Articles, Libraries and Resources!</Title>

    <Newsletter />

    <CardGrid data={data} />

    <LoadMore count={count} />
  </div>;
}

