const aliases = require('module-alias/register')
const { client } = require("@services/database")
const normasService = require('@services/normas')

exports.handler = (event, context, callback) => {
  if (event.path === "/normas") {
    normasService.getStandards()
      .then((response) => {
        callback(null, response)
      })
  }
}