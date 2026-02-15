const express = require("express")
const postcontroller = require("../controller/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })

const postRoute = express.Router()

postRoute.post("/create", upload.single('image'), postcontroller.createPostController )

postRoute.get("/get", postcontroller.getPostController )

postRoute.get("/details/:postId", postcontroller.getPostDetailsController )

module.exports = postRoute