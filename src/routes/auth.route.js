const express = require("express")
const authController = require("../controllers/auth.controller")

const userRoute = express.Router()

userRoute.post("/register", authController.registerController)

userRoute.post("/login", authController.loginController)


module.exports = userRoute