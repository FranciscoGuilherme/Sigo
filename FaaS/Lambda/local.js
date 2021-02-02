const { config } = require("dotenv").config()
const { handler } = require("./index")

handler({
  path: "/normas",
  httpMethod: "POST"
}, null, (data, response) => {
  console.log(response)
})