const normasRepository = require('@repository/normas')

const getCompliances = () => {
  return new Promise((resolve, reject) => {
    normasRepository.getCompliances()
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const createCompliance = (compliances) => {
  return new Promise((resolve, reject) => {
    normasRepository.createCompliance(compliances)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

exports.getCompliances = getCompliances
exports.createCompliance = createCompliance