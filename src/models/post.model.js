const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({  
  imageurl:{
    type:String,
    required:[true, "with out url you not create a post"]
  },
  caption:{
    type:String,
    default:""
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"instaUser",
    required:[true, "user id is required is creatign a post"]
  }
})

const postModel = mongoose.model("post", postSchema)
module.exports = postModel