const monogose = require("mongoose")

function connectToDB (){
  monogose.connect(process.env.MONGOS_URI)
  .then(()=>{
    console.log("connect to DB")
  })
}

module.exports = connectToDB