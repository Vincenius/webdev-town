'use strict'
require('dotenv').config()
const db = require('./database')
const sendEmail = require('./email')

const { CORS, STRINGIFY_RESPONSE }= process.env

console.log(STRINGIFY_RESPONSE)

const defaultResponse = {
  "statusCode": 200,
  "headers": {
    "Access-Control-Allow-Origin" : CORS,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  },
  "body": {},
}

const parseResponse = response => STRINGIFY_RESPONSE !== 'false'
  ? JSON.stringify(response)
  : response

exports.handler = async (event) => {
  try {
    const method = event.requestContext.http.method;
    if (method === "GET") {
      const queryParams = event["queryStringParameters"] || {}
      const { q: search, page: pageString } = queryParams;

      const page = parseInt(pageString, 10) || 1;
      const { result, count } = await db.getByQuery({ search, page });

      const response = {
        ...defaultResponse,
        body: parseResponse({
          page,
          total: count,
          result,
        }),
      };
      return response;
    } else if (method === "POST") {
      await sendEmail(event.body)
      const response = defaultResponse
      return response;
    } else if (method === "OPTIONS") {
      return defaultResponse;
    } else {
      return {
        ...defaultResponse,
        body: parseResponse({
          message: "Method not allowed"
        }),
      };
    }
  } catch (e) {
    return {
      ...defaultResponse,
      statusCode: 500,
    }
  }

};
