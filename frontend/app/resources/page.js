import { Title } from '@mantine/core'
import Link from 'next/link'
import style from '../page.module.css'
import { getByQuery, getCount } from '../../utils/database';
import Newsletter from '../../components/Newsletter/Newsletter';
import CardGrid from '../../components/Card/CardGrid';
import LoadMore from '../../components/LoadMore/LoadMore';

async function getData(tag) {
  const today = new Date();

  const query = {
    created_at: {
      $lte: today.toISOString(),
    },
    // sponsored: { $ne: true },
  };

  const [data, count] = await Promise.all([
    getByQuery({ query }),
    getCount(),
  ])

  return { data, count }
}

export default async function Resources() {
  const result = await getData()
  const { data, count } = result

  return <div className={style.container}>
    <Title order={2}>Discover all <span className={style.textGradient}>{count}</span> Web Development Resources</Title>

    <Newsletter />

    <CardGrid data={data} />

    <LoadMore count={count} />
  </div>;
}

