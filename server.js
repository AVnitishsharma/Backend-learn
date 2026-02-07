require("dotenv").config() // ye env ko server se connect krti ha
const app = require("./src/app")
const connectToDB = require("./src/config/database")

connectToDB()

app.listen(3000, ()=>{
  console.log("server is runing on port 3000")
})