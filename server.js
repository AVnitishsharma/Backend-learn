//Server ko start krna 
//Data based se connect krna 
require("dotenv").config()
const app = require("./src/app")
const connectdb = require("./src/config/database")

connectdb()

app.listen(3000, ()=>{
  console.log("server is runing on port 3000");
})