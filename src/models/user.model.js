const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username:{
    type: String,
    required: true,
    unique:[true, "this username is not available"]
  },
  email:{
    type: String,
    required: true,
    unique:[true, "this email is allready exiest"]
  },
  password:{
    type: String,
    required: true
  },
  bio:String,
  profilepic:{
    type: String,
    default:"this is default profile peacture"
  }
})

const userModel = mongoose.model("instaUser", userSchema)
module.exports = userModel