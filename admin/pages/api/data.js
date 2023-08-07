import { getByQuery } from '../../utils/database'

const handler = async (req, res) => {
  const today = new Date();
  const query = {
    sponsored: { $ne: true },
    created_at: { $gte: today.toISOString() }
  };
  const result = await getByQuery({ query })
  res.status(200).json(result)
}

export default handler
