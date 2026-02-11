const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:[true, "This username is already exists"]
  },
  email: {
    type: String,
    required: true,
    unique:[true, "This email is allready exists"]
  },
  password: {
    type: String,
    required: true
  },
  bio:String,
  dp:{
    type:String,
    default:"sdlfsdfksdkfsldfdlf"
  }
})

const userModel = mongoose.model("insta user", userSchema)
module.exports = userModel