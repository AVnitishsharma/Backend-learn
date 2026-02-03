const mongoose = require("mongoose")

function connectdb(){
  mongoose.connect(process.env.MONGO_URL)
  .then(()=>{
    console.log("connect to database")
  })
}

module.exports = connectdb