import ogs from 'open-graph-scraper'

const handler = async (req, res) => {
  const url = decodeURI(req.query.url)
  const options = { url };

  ogs(options)
    .then((data) => {
      const { error, result } = data

      if (error) {
        res.status(500).json({ error })
      } else {
        res.status(200).json({ result })
      }
    })
}

export default handler
