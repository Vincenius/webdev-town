import { Title } from '@mantine/core'
import Link from 'next/link'
import style from '../../page.module.css'
import { getByQuery, getCount } from '../../../utils/database';
import Newsletter from '../../../components/Newsletter/Newsletter';
import CardGrid from '../../../components/Card/CardGrid';
import LoadMore from '../../../components/LoadMore/LoadMore';

const tags = {
  "javascript": {
    title: "JavaScript Resources",
    tag: "JavaScript"
  },
  "css": {
    title: "CSS Resources",
    tag: "CSS"
  },
  "tool": {
    title: "Web Development Tools",
    tag: "Tool"
  },
  "react": {
    title: "React Resources",
    tag: "React"
  },
  "article": {
    title: "Web Development Articles",
    tag: "Article"
  },
  "design": {
    title: "Design Resources",
    tag: "Design"
  },
  "library": {
    title: "Libraries",
    tag: "Library"
  },
  "other": {
    title: "Other Resources",
    tag: "Other"
  }
}

async function getData(tag) {
  const today = new Date();

  const query = {
    created_at: {
      $lte: today.toISOString(),
    },
    // sponsored: { $ne: true },
    tags: tag,
  };

  const [data, count] = await Promise.all([
    getByQuery({ query }), // page
    getCount({ tags: tag }),
  ])

  return { data, count }
}

export default async function HomePage({ params }) {
  const tag = tags[params.slug]
  if (!tag) {
    return <div className={style.container}>
      <Title order={2}>404 - Page not found</Title>
      <p>
        Your selected page could not be found.<br/>Please return to the <Link href="/">Homepage</Link>.
      </p>
    </div>
  }

  const result = await getData(tag.tag)
  const { data, count } = result

  return <div className={style.container}>
    <Title order={2}>Discover <span className={style.textGradient}>{count}</span> {tag.title}</Title>

    <Newsletter />

    <CardGrid data={data} />

    <LoadMore count={count} tag={tag.tag} />
  </div>;
}

