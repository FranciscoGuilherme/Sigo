const format = (status, data) => {
  return {
    statusCode: status,
    headers: {
        "Content-Type": "*/*"
    },
    body: JSON.stringify(data)
  }
}

module.exports.format = format