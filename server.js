require("dotenv").config()
const app = require("./src/app")
const connectToDB = require("./src/config/DB")

connectToDB()

app.listen(3000, ()=>{
  console.log("server is runing on port 3000")
})