const { client } = require("@services/database")

const getStandards = () => {
  return new Promise((resolve, reject) => {
    client.connect()
    client.query('SELECT NOW()')
      .then((response) => {
        client.end()
        resolve(response.rows)
      })
      .catch((error) => {
        client.end()
        reject(error)
      })
  })
}

module.exports.getStandards = getStandards