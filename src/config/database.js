const mongooes = require("mongoose")

function connectdb() {
  mongooes.connect(process.env.MONGO_URL)
  .then(()=>{
    console.log("connected to DB");
    
  })
}

module.exports = connectdb