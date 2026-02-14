const postModel = require("../models/post.model")
const jwt = require("jsonwebtoken")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")

const imagekit = new ImageKit({
  privetkey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController (req, res) {
  // console.log(req.body, req.file)

  const token = req.cookies.token

  if(!token){
    return res.status(404).json({
      message:"token not provided, Unauthorze acces"
    })
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRATE)

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), 'file'),
    fileName: 'post images',
  });

  const post = await postModel.create({
    imgurl: file.url,
    caption: req.body.caption,
    user: decoded.id
  })

  res.status(200).json({
    message:"post create successfully",
    post
  })
}

module.exports = {createPostController}