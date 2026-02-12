const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")

const Imagekit = new ImageKit({
  privetkey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController (req, res){
  console.log(req.body,req.file)

  const file = await Imagekit.file.upload({
    file: await toFile(buffer.from(req.file.buffer), 'file'),
    fileName: 'image'
  })

  res.send({file})

  res.json({
    message: "File uploaded successfully",
    file: req.file
  })
}

module.exports = {
  createPostController
}