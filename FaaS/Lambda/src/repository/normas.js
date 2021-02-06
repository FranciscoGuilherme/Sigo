const { Pool } = require('pg')
const consults = require("@repository/consults")

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE
})

const getCompliances = () => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      client.query(consults.GET_ALL_COMPLIANCES_QUERY, (error, response) => {
        const total = response.rows.length
        response.rows.forEach((compliance, index) => {
          client.query(consults.GET_ALL_STANDARDS_BY_COMPLIANCE_ID, [
            compliance.compliance_id
          ], (err, res) => {
            response.rows[index] = Object.assign(compliance, { standardsList: res.rows })

            if (total === index + 1) {
              client.end()
              release()
              if (err) { reject(err) }
              if (!err) { resolve(response.rows) }
            }
          })
        })
      })
    })
  })
}

const createCompliance = (compliances) => {
  const total = compliances.length
  return new Promise((resolve, reject) => {
    let data = []
    pool.connect((err, client, release) => {
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
              release()
              if (err) { reject(err) }
              if (!err) { resolve(data) }
            }
          })
        })
      })
    })
  })
}

const updateCompliance = (compliance) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      client.query(consults.UPDATE_COMPLIANCE_QUERY, [
        compliance.data.name,
        compliance.data.desc,
        compliance.data.id
      ], (err, res) => {
        release()
        if (err) { reject(err) }
        if (!err) { resolve(res) }
      })
    })
  })
}

const updateStandard = (compliandeId, standard) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      client.query(consults.UPDATE_STANDARD_QUERY, [
        standard.code,
        standard.name,
        standard.desc,
        standard.status,
        standard.id
      ], (err, res) => {
        client.end()
        release()
        if (err) { reject(err) }
        if (!err) { resolve(res) }
      })
    })
  })
}

const deleteCompliance = (compliandeId) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      client.query(consults.DELETE_COMPLIANCE_QUERY, [compliandeId], (error, response) => {
        client.query(consults.DELETE_STANDARD_QUERY, [compliandeId], (err, res) => {
          release()
          if (err) { reject(err) }
          if (!err) { resolve(res) }
        })
      })
    })
  })
}

const deleteStandard = (compliandeId) => {
  return new Promise((resolve, reject) => {
    pool.connect((err, client, release) => {
      client.query(consults.DELETE_STANDARD_QUERY, [compliandeId], (err, res) => {
        client.end()
        release()
        if (err) { reject(err) }
        if (!err) { resolve(res) }
      })
    })
  })
}

exports.getCompliances = getCompliances
exports.createCompliance = createCompliance
exports.updateCompliance = updateCompliance
exports.updateStandard = updateStandard
exports.deleteCompliance = deleteCompliance
exports.deleteStandard = deleteStandard