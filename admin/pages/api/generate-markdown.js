import { getByQuery } from '../../utils/database'

const handler = async (req, res) => {
  const { intro, fromDate, toDate, number } = JSON.parse(req.body)
  const query = {
    created_at: { $lte: toDate, $gte: fromDate }
  };
  const data = await getByQuery({ query })

  const sortedData = data.sort((a, b) => a.sponsored ? -1 : b.created_at.localeCompare(a.created_at))

  let markDown = intro
  const baseUrl = process.env.S3_CDN

  for (const item of sortedData) {
    const image = `${baseUrl}${item.image.replace('../assets', '').replace('/weekly', '')}`
    markDown = `${markDown}

______

${item.sponsored ? '*Sponsored*' : ''}
##[${item.title}](${item.link})
[![${item.title}](${image})](${item.link})
${item.description}`
}

markDown = `${markDown}

______


_Enjoyed this newsletter? You can support me by:_

📧 Subscribing to the weekly email newsletter on [WebDev Town](https://webdev.town/)

💬 commenting and letting me know

💸 donating via [Ko-Fi](https://ko-fi.com/webdev_town)


Cheers,
Vincent from [WebDev Town](https://webdev.town)`

  res.status(200).json({ result: markDown })
}

export default handler
