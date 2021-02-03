const { config } = require("dotenv").config()
const { handler } = require("./index")

handler({
  path: process.env.HTTP_PATH,
  httpMethod: process.env.HTTP_METHOD,
  body: JSON.stringify({
    compliance: {
      data: {
        id: 4,
        name: "APP",
        desc: "Description APP"
      },
      standardsList: [
        {
          id: 4,
          code: "CAPP",
          name: "APP",
          desc: "Alguma descrição APP",
          status: true
        }
      ]
    }
  })
}, null, (data, response) => {
  console.log(response)
})