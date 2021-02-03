const { client } = require("@services/database")
const consults = require("@repository/consults")

const getStandards = () => {
  return new Promise((resolve, reject) => {
    client.connect()
    client.query(consults.GET_ALL_COMPLIANCES_QUERY)
      .then((response) => {
        (async () => await client.end())()
        resolve(response.rows)
      })
      .catch((error) => {
        (async () => await client.end())()
        reject(error)
      })
  })
}

const createCompliance = (compliances) => {
  return new Promise((resolve, reject) => {
    client.connect()
    client.query(consults.getBatchComplianceQuery(compliances))
      .then((response) => {
        (async () => await client.end())()
        resolve(response.rows)
      })
      .catch((error) => {
        (async () => await client.end())()
        reject(error)
      })
  })
}

exports.getStandards = getStandards
exports.createCompliance = createCompliance