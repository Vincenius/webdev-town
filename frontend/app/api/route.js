import { NextResponse } from 'next/server';
import { getByQuery } from '../../utils/database';

export async function GET(request) {
  const page = parseInt(request.nextUrl.searchParams.get('page') || '1', 10)
  const tag = request.nextUrl.searchParams.get('tag') || ''
  const today = new Date();

  const defaultQuery = {
    created_at: {
      $lte: today.toISOString(),
    },
    sponsored: { $ne: true },
  };
  const tagQuery = tag? { tags: tag } : {};
  const query = {
    ...defaultQuery,
    ...tagQuery,
  }

  // const query = [
  //   search && {
  //     $search: {
  //       "text": {
  //         "query": search,
  //         "path": ["title", "description", "link"]
  //       }
  //     }
  //   },
  //   {
  //     $match: {
  //       sponsored: { $ne: true },
  //       created_at: { $lte: new Date().toISOString() }
  //     }
  //   },
  //   {
  //     $facet: {
  //       results: [
  //         {
  //           $sort: search
  //             ? { score: { $meta: "textScore" } }
  //             : { created_at: -1 }
  //         },
  //         {
  //           $limit: (page * 48)
  //         },
  //         {
  //           $skip: (page - 1) * 48
  //         }
  //       ],
  //       totalCount: [
  //         { $count: "count" }
  //       ]
  //     }
  //   },
  // ].filter(Boolean);

  // const dbResult = await collection
  //   .aggregate(query)
  //   .toArray()

  // result = dbResult[0].results;
  // count = dbResult[0].totalCount[0]?.count || 0;

  const result = await getByQuery({ query, page })
  return NextResponse.json(result);
}
