const aliases = require('module-alias/register')
const httpStatus = require('http-status')
const response = require("@utils/response")
const normasService = require('@services/normas')

exports.handler = (event, context, callback) => {
  if (event.path === "/normas") {
    switch (event.httpMethod) {
      case "GET": {
        normasService.getStandards()
          .then((result) => {
            callback(null, response.format(httpStatus.OK, result))
          })
      }
      case "POST": {}
    }
  }
}