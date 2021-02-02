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

module.exports.getStandards = getStandards