const aliases = require('module-alias/register')
const httpStatus = require('http-status')
const response = require("@utils/response")
const normasService = require('@services/normas')

exports.handler = (event, context, callback) => {
  let content = JSON.parse(event.body)

  if (event.path === "/normas") {
    if (event.httpMethod === "GET") {
      normasService.getCompliances()
      .then((result) => {
        callback(null, response.format(httpStatus.OK, result))
      })
    }

    if (event.httpMethod === "POST") {
      normasService.createCompliance(content.compliances)
          .then((result) => {
            callback(null, response.format(httpStatus.OK, result))
          })
    }
  }
}