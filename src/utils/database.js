import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = import.meta.env.MONGODB_URI

const connectDb = () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
  return client.connect()
}

export const getByQuery = async query => {
  let result = []
  const dbClient = await connectDb()

  try {
    const db = dbClient.db('weekly')
    const collection = db.collection('weekly')

    result = await collection.find(query).toArray()
  } catch (e) {
    console.log('error', e)
  }

  await dbClient.close()

  return result
}

