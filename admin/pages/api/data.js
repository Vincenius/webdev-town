import { getByQuery } from '../../utils/database'

const handler = async (req, res) => {
  const today = new Date();
  today.setUTCDate(0, 1, 0, 0)
  const { all, page } = req.query;
  const pageInt = parseInt(page, 10);
  const query = all === 'true'
    ? {} : {
      // sponsored: { $ne: true },
      created_at: { $gte: today.toISOString() }
    };
  const result = await getByQuery({ query, page: pageInt })
  res.status(200).json(result)
}

export default handler
