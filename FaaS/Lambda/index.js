const aliases = require('module-alias/register')
const httpStatus = require('http-status')
const response = require("@utils/response")
const normasService = require('@services/normas')

exports.handler = (event, context, callback) => {
  let content = {}

  if (event.body) {
    content = JSON.parse(event.body)
  }

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
          callback(null, response.format(httpStatus.OK, {
            message: 'Sucesso ao criar os registros',
            details: result
          }))
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
              .then((res) => {
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

    if (event.httpMethod === "DELETE") {
      normasService.deleteCompliance(content.compliance.data.id)
        .then((result) => {
          normasService.deleteStandard(content.compliance.data.id)
            .then((res) => {
              callback(null, response.format(httpStatus.OK, {
                message: "Dados deletados com sucesso"
              }))
            })
        })
        .catch((error) => {
          callback(null, response.format(httpStatus.INTERNAL_SERVER_ERROR, {
            message: 'Erro ao deletar o compliance',
            details: error
          }))
        })
    }
  }
}