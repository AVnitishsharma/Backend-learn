const express = require("express")
const usercontroller = require("../controller/user.controller")

const userRoute = express.Router()

userRoute.post("/register", usercontroller.userRegisterController)

userRoute.post("/login", usercontroller.userLoginController)

module.exports = userRoute