import { ObjectId } from 'mongodb'
import { updateByQuery } from '../../utils/database'

const handler = async (req, res) => {
  const { _id, ...update } = req.body
  const result = await updateByQuery({ _id: new ObjectId(_id) }, update)
  res.status(200).json(result)
}

export default handler
