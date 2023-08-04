require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb')

const uri = process.env.MONGODB_URI

const connectDb = () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
  return client.connect()
}

module.exports = {
  getByQuery: async ({ search, page }) => {
    let result = []
    let count = 0

    const query = [
      search && {
        $search: {
          "text": {
            "query": search,
            "path": ["title", "description", "link"]
          }
        }
      },
      {
        $match: {
          sponsored: { $ne: true },
          created_at: { $lte: new Date().toISOString() }
        }
      },
      {
        $facet: {
          results: [
            {
              $sort: search
                ? { score: { $meta: "textScore" } }
                : { created_at: -1 }
            },
            {
              $limit: (page * 50)
            },
            {
              $skip: (page - 1) * 50
            }
          ],
          totalCount: [
            { $count: "count" }
          ]
        }
      },,
    ].filter(Boolean);
    const dbClient = await connectDb()

    try {
      const db = dbClient.db('weekly')
      const collection = db.collection('weekly')

      const dbResult = await collection
        .aggregate(query)
        .toArray()

      result = dbResult[0].results;
      count = dbResult[0].totalCount[0]?.count || 0;

    } catch (e) {
      console.log('error', e)
    }

    await dbClient.close()

    return { result, count }
  }
}