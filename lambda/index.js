'use strict'
const db = require('./database')

exports.handler = async (event) => {
  const queryParams = event["queryStringParameters"] || {}
  const { q: search, page: pageString } = queryParams;

  const page = parseInt(pageString, 10) || 1;
  const { result, count } = await db.getByQuery({ search, page });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      page,
      total: count,
      result,
    }),
  };
  return response;
};
