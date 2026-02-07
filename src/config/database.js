const mongoose = require("mongoose")

function connectToDB(){
  mongoose.connect(process.env.MONGOS_URI)
  .then(()=>{
    console.log("connect to DB");
    
  })
}

module.exports = connectToDB