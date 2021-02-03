const format = (status, data) => {
  return {
    statusCode: status,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }
}

module.exports.format = format