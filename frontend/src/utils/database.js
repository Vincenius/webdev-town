import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = import.meta.env.MONGODB_URI

const connectDb = () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
  return client.connect()
}

export const getByQuery = async ({ query, limit = 48 }) => {
  let result = []
  const dbClient = await connectDb()

  try {
    const db = dbClient.db('weekly')
    const collection = db.collection('weekly')

    result = await collection
      .find(query)
      .sort({ created_at: -1 })
      .limit(limit)
      .toArray()
  } catch (e) {
    console.log('error', e)
  }

  await dbClient.close()

  return result
}

export const getCount = async () => {
  let result = 0
  const dbClient = await connectDb()

  try {
    const db = dbClient.db('weekly')
    const collection = db.collection('weekly')

    const today = new Date();
    const query = {
      sponsored: { $ne: true },
      created_at: {
        $lte: today.toISOString(),
      }
    };
    result = await collection.countDocuments(query)
  } catch (e) {
    console.log('error', e)
  }

  await dbClient.close()

  return result
}
