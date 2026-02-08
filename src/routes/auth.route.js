const express = require("express")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")

const authRoute = express.Router() //ye routh ko dusre file me challata ha

authRoute.post("/register", async (req , res)=>{
  const {name, email, password} = req.body

  const isUserAllreadyExists = await userModel.findOne({email})  //ye same email ko find krta ha

  if(isUserAllreadyExists){       //ye same email pr error deta ha
    res.status(400).json({
      message:"this email is allready exists"
    })
  }

  const user = await userModel.create({
    name, email, password
  })

  const token = jwt.sign(             //token create krte ha with id and email ap ek se bhi kr skte ha
    {
      id:user._id,
      email:user.email
    },
    process.env.JWT_SECRET
  )

  res.cookie("jwt_token", token)      //ye token ko cookie me save krta ha
  
  res.status(201).json({
    message:"user is created",
    user, token
  })
})

module.exports = authRoute