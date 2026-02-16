const express = require("express")
const multer = require("multer")
const upload = multer({stroage: multer.memoryStorage()})
const postController = require("../controller/post.controller")

const postRoute = express.Router()

postRoute.post("/create", upload.single("image"),postController.createPostController)

postRoute.get("/get", postController.getPostController)

postRoute.get("/details/:postId", postController.detailsPostController)

module.exports = postRoute