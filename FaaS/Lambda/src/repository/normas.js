const { client } = require("@services/database")
const consults = require("@repository/consults")

const getCompliances = () => {
  return new Promise((resolve, reject) => {
    client.connect()
    client.query(consults.GET_ALL_COMPLIANCES_QUERY)
      .then((response) => {
        const total = response.rows.length
        response.rows.forEach((compliance, index) => {
          client.query(consults.GET_ALL_STANDARDS_BY_COMPLIANCE_ID, [compliance.compliance_id])
            .then((res) => {
              response.rows[index] = Object.assign(compliance, { standardsList: res.rows })

              if (total === index + 1) {
                client.end()
                resolve(response.rows)
              }
            })
        })
      })
      .catch((error) => { client.end(); reject(error) })
  })
}

const createCompliance = (compliances) => {
  return new Promise((resolve, reject) => {
    client.connect()

    compliances.forEach(compliance => {
      client.query(consults.INSERT_NEW_COMPLIANCE_QUERY, [
        compliance.data.name,
        compliance.data.desc
      ])
        .then((response) => {
          client.query(consults.getBatchStandardQuery(
            response.rows[0].compliance_id,
            compliance.standardsList)
          )
            .then((res) => { client.end(); resolve(res.rows) })
            .catch((err) => { client.end(); reject(err) })
        })
        .catch((error) => { client.end(); reject(error) })
    })
  })
}

exports.getCompliances = getCompliances
exports.createCompliance = createCompliance