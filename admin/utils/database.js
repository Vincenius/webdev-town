import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = process.env.MONGODB_URI

const connectDb = () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
  return client.connect()
}

export const getByQuery = async ({ query }) => {
  let result = []
  const dbClient = await connectDb()

  try {
    const db = dbClient.db('weekly')
    const collection = db.collection('weekly')

    result = await collection
      .find(query)
      .sort({ created_at: -1 })
      .toArray()
  } catch (e) {
    console.log('error', e)
  }

  await dbClient.close()

  return result
}

export const create = async (data) => {
  let result
  let client
  try {
    client = await connectDb()
    const db = client.db('weekly')
    const collection = db.collection('weekly')

    result = await collection.insertOne(data)
  } catch (e) {
    console.log(`error on creating`, e)
  } finally {
    if (client) {
      await client.close()
    }
  }

  return result
}