const express = require("express")
const userModel = require("../models/user.model")

const authRouter = express.Router()

authRouter.post("/register",async (req,res)=>{
  const {name, email, password} = req.body

  const isUserAllreadyExists = await userModel.find({email})

  if(isUserAllreadyExists){
    res.status(400).json({
      message:"This email is allready exists"
    })
  }
  const user = await userModel.create({
    name, email, password
  })

  res.status(201).json({
    message:"user is created",
    user
  })
})

module.exports = authRouter