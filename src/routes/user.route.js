const express = require("express")
const userController = require("../controller/user.controller")

const userRoute = express.Router()

userRoute.post("/register", userController.userRegisterController)
userRoute.post("/login", userController.userLoginController)

module.exports = userRoute