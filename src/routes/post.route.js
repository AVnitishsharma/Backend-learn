const express = require("express")
const postcontroller = require("../controller/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

const postRoute = express.Router()

postRoute.post("/post", upload.single('image'), postcontroller.createPostController )

module.exports = postRoute