const { Client } = require('pg')
const consults = require("@repository/consults")

const client = new Client(process.env.CONNECTION_STRING)

const getCompliances = () => {
  const client = new Client(process.env.CONNECTION_STRING)
  return new Promise((resolve, reject) => {
    client.connect()
    client.query(consults.GET_ALL_COMPLIANCES_QUERY, (error, response) => {
      const total = response.rows.length
      response.rows.forEach((compliance, index) => {
        client.query(consults.GET_ALL_STANDARDS_BY_COMPLIANCE_ID, [
          compliance.compliance_id
        ], (err, res) => {
          response.rows[index] = Object.assign(compliance, { standardsList: res.rows })

            if (total === index + 1) {
              client.end()
              resolve(response.rows)
            }
        })
      })
    })
  })
}

const createCompliance = (compliances) => {
  const total = compliances.length
  const client = new Client(process.env.CONNECTION_STRING)
  return new Promise((resolve, reject) => {
    let data = []
    client.connect()
    compliances.forEach((compliance, index) => {
      client.query(consults.INSERT_NEW_COMPLIANCE_QUERY, [
        compliance.data.name,
        compliance.data.desc
      ], (error, result) => {
        data.push(result.rows[0])
        client.query(consults.getBatchStandardQuery(
          result.rows[0].compliance_id,
          compliance.standardsList
        ), () => {
          if (total === index + 1) {
            client.end()
            resolve(data)
          }
        })
      })
    })
  })
}

const updateCompliance = (compliance) => {
  return new Promise((resolve, reject) => {
    client.connect()
    client.query(consults.UPDATE_COMPLIANCE_QUERY, [
      compliance.data.name,
      compliance.data.desc,
      compliance.data.id
    ], (err, res) => {
      client.end()
      resolve(res.rows)
    })
  })
}

const updateStandard = (compliandeId, standard) => {
  return new Promise((resolve, reject) => {
    client.query(consults.UPDATE_STANDARD_QUERY, [
      compliandeId,
      standard.code,
      standard.name,
      standard.desc,
      standard.status,
      standard.id
    ], (err, res) => {
      client.end()
      resolve(res.rows)
    })
  })
}

const deleteCompliance = (compliandeId) => {
  return new Promise((resolve, reject) => {
    client.connect()
    client.query(consults.DELETE_COMPLIANCE_QUERY, [compliandeId], (error, response) => {
      client.query(consults.DELETE_STANDARD_QUERY, [compliandeId], (err, res) => {
        client.end()
        resolve(res)
      })
    })
  })
}

const deleteStandard = (compliandeId) => {
  return new Promise((resolve, reject) => {
    client.query(consults.DELETE_STANDARD_QUERY, [compliandeId], (err, res) => {
      client.end()
      resolve(res)
    })
  })
}

exports.getCompliances = getCompliances
exports.createCompliance = createCompliance
exports.updateCompliance = updateCompliance
exports.updateStandard = updateStandard
exports.deleteCompliance = deleteCompliance
exports.deleteStandard = deleteStandard