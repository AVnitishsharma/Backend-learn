const express = require("express")
const userController = require("../controller/user.controller")

const userRouth = express.Router()

userRouth.post("/register", userController.registerController)
userRouth.post("/login", userController.loginController)

module.exports = userRouth