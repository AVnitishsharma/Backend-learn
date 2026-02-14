const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({  
  imgurl:{
    type:String,
    required:[true, "whith out imgUrl you are not creating a post"]
  },
  caption:{
    type:String,
    default:''
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"instaUser",
    required:[true, "user id is required is creatign a post"]
  }
})

const postModel = mongoose.model("post", postSchema)
module.exports = postModel