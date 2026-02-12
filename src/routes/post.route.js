const express = require("express")
const postController = require("../controller/post.controller")
const multer = require("multer")

const uplode = multer({storage: multer.memoryStorage()})
const postRoute = express.Router()

postRoute.post("/post",uplode.single("image"), postController.createPostController)


module.exports = postRoute