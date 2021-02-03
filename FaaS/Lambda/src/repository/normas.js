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

const updateCompliance = (compliance) => {
  return new Promise((resolve, reject) => {
    client.connect()
    client.query(consults.UPDATE_COMPLIANCE_QUERY, [
      compliance.data.name,
      compliance.data.desc,
      compliance.data.id
    ])
      .then((res) => { resolve(res.rows) })
      .catch((err) => { client.end(); reject(err) })
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
    ])
      .then((res) => { client.end(); resolve(res.rows) })
      .catch((err) => { client.end(); reject(err) })
  })
}

exports.getCompliances = getCompliances
exports.createCompliance = createCompliance
exports.updateCompliance = updateCompliance
exports.updateStandard = updateStandard