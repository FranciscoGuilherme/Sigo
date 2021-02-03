const normasRepository = require('@repository/normas')

const getStandards = () => {
  return new Promise((resolve, reject) => {
    normasRepository.getStandards()
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

exports.getStandards = getStandards
exports.createCompliance = createCompliance