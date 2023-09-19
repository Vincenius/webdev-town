import { getByQuery } from '../../utils/database'

const handler = async (req, res) => {
  const today = new Date();
  today.setUTCDate(0, 1, 0, 0)
  const page = parseInt(req.query.page) || 0;
  const query = req.query.all === 'true'
    ? {} : {
      created_at: { $gte: today.toISOString() }
    };
  const result = await getByQuery({ query, page })
  res.status(200).json(result)
}

export default handler
