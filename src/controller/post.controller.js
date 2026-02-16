const postModel = require("../models/post.model")
const jwt = require("jsonwebtoken")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")

const imagekit = new ImageKit({
  privetkey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController (req, res) {
  
  const token = req.cookies.token

  if(!token){
    return res.status(404).json({
      message:"token is not found"
    })
  }

  let decode;
  try{
    decode = jwt.verify(token, process.env.JWT_SECRATE)
  } catch(err){
    return  res.status(401).json({
      message:"user not authorized"
    })
  }

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName: 'post images',
    folder:"/insta-posts"
  });

  const post = await postModel.create({
    imageurl: file.url,
    caption: req.body.caption,
    user: decode.id
  })

  res.status(200).json({
    message:"post is created",
    post
  })
}

async function getPostController(req, res) {
  
  const token = req.cookies.token

  if(!token){
    return res.status(404).json({
      message:"token not provided, Unauthorze acces"
    })
  }

  let decode;

  try{
    decode = jwt.verify(token, process.env.JWT_SECRATE)
  } catch(err){
    return res.status(401).json({
      message: "user not athorize"
    })
  }

  const userId = decode.id

  const posts = await postModel.find({
    user: userId
  })

  res.status(200).json({
    message:"all posts are featched",
    posts
  })
}

async function detailsPostController(req, res) {
  
  const token = req.cookies.token

  if(!token){
    return res.status(404).json({
      message:"token not provided, Unauthorze acces"
    })
  }

  let decode;
  try{
    decode = jwt.verify(token, process.env.JWT_SECRATE)
  } catch(err){
    return res.status(401).json({
      message: "user not athorize"
    })
  }

  const userId = decode.id
  const postId = req.params.postId

  const post = await postModel.findById(postId)

  if(!post){
    return res.status(404).json({
      message:"post not found"
    })
  }
  
  const isValidUser = post.user.toString() == userId

  if(!isValidUser){
    return res.status(403).json({
      message:"forbedden contents this post is private"
    })
  }

  res.status(200).json({
    message:"Post details is featched",
    post
  })
}

module.exports = {createPostController,getPostController,detailsPostController}