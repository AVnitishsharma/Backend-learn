//Server ko start krna 
//Data based se connect krna 

require("dotenv").config() //ye uri ko server tak lata ha nhi to undifine aye ga

const app = require("./src/app")
const connectdb = require("./src/config/database")

connectdb() // run server function

app.listen(3000,()=>{
  console.log("server is runing on port 3000");
})
