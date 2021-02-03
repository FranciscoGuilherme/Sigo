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

const updateCompliance = (compliance) => {
  return new Promise((resolve, reject) => {
    normasRepository.updateCompliance(compliance)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const updateStandard = (compliandeId, standard) => {
  return new Promise((resolve, reject) => {
    normasRepository.updateStandard(compliandeId, standard)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const deleteCompliance = (compliandeId) => {
  return new Promise((resolve, reject) => {
    normasRepository.deleteCompliance(compliandeId)
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

const deleteStandard = (compliandeId) => {
  return new Promise((resolve, reject) => {
    normasRepository.deleteStandard(compliandeId)
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
exports.updateCompliance = updateCompliance
exports.updateStandard = updateStandard
exports.deleteCompliance = deleteCompliance
exports.deleteStandard = deleteStandard