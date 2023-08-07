'use strict'
require('dotenv').config()
const db = require('./database')
const sendEmail = require('./email')

const cors = process.env.CORS

const defaultResponse = {
  statusCode: 200,
  headers: {
    "Access-Control-Allow-Origin" : cors,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  },
  body: {},
}

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
        body: {
          page,
          total: count,
          result,
        },
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
        body: {
          message: "Method not allowed"
        },
      };
    }
  } catch (e) {
    return {
      ...defaultResponse,
      statusCode: 500,
    }
  }

};
