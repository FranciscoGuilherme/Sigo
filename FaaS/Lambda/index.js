const { client } = require("./services/db")

exports.handler = () => {
  const event = {
    path: "/normas"
  }

  client.connect()
  client.query('SELECT NOW()', (err, res) => {
    console.log(res.rows[0])
    client.end()
  })

  /*
  if (event.path === "/normas") {
      const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Sucesso',
        input: client
      }),
    }

    return response
    //callback(null, response)
  }*/
}