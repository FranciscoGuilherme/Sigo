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
        .catch((error) => {
          callback(null, response.format(httpStatus.INTERNAL_SERVER_ERROR, {
            message: 'Erro ao consultar os dados',
            details: error
          }))
        })
    }

    if (event.httpMethod === "POST") {
      normasService.createCompliance(content.compliances)
        .then((result) => {
          callback(null, response.format(httpStatus.OK, result))
        })
        .catch((error) => {
          callback(null, response.format(httpStatus.INTERNAL_SERVER_ERROR, {
            message: 'Erro ao criar o compliance',
            details: error
          }))
        })
    }

    if (event.httpMethod === "PUT") {
      normasService.updateCompliance(content.compliance)
        .then((result) => {
          content.compliance.standardsList.forEach(standard => {
            normasService.updateStandard(content.compliance.data.id, standard)
              .then((result) => {
                callback(null, response.format(httpStatus.OK, {
                  message: "Dados atualizados com sucesso"
                }))
              })
              .catch((error) => {
                callback(null, response.format(httpStatus.INTERNAL_SERVER_ERROR, {
                  message: 'Erro ao atualizar os dados das normas',
                  details: error
                }))
              })
          })
        })
        .catch((error) => {
          callback(null, response.format(httpStatus.INTERNAL_SERVER_ERROR, {
            message: 'Erro ao atualizar os dados do compliance',
            details: error
          }))
        })
    }
  }
}