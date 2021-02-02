const { config } = require("dotenv").config()
const { handler } = require("./index")

handler({
  path: process.env.HTTP_PATH,
  httpMethod: process.env.HTTP_METHOD
}, null, (data, response) => {
  console.log(response)
})