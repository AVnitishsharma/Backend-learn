const express = require("express")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const crypto = require("crypto")

const authRoute = express.Router() //ye routh ko dusre file me challata ha ka premination deta ha jaise app.js

authRoute.post("/register", async (req , res)=>{        //register api
  const {name, email, password} = req.body

  const isUserAllreadyExists = await userModel.findOne({email})  //ye same email ko find krta ha

  if(isUserAllreadyExists){       //ye same email pr error deta ha
    return res.status(409).json({
      message:"this email is allready exists"
    })
  }

  const hash = crypto.createHash("md5").update(password).digest("hex")   // ye password ko hash password me create krta ha

  const user = await userModel.create({
    name, email, password: hash
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

authRoute.post("/login", async(req, res)=>{         //login api
  
  const {email, password} = req.body

  const user = await userModel.findOne({email})  //email check krna ki phele se ye email ha bhi ya nhi
  if(!user){
    return res.status(404).json({
      message:"email not found"
    })
  }
 
  const isPasswordMatch = user.password === crypto.createHash("md5").update(password).digest("hex")   // user.password - database // ye password ko hash password me create krta ha
  if(!isPasswordMatch){
    return res.status(401).json({
      message:"invilet password"
    })
  }

  const token = jwt.sign(
    {
      id:user._id,
      email:user.email,
    },
    process.env.JWT_SECRET
  )

  res.status(200).json({
    message:"user login succesfully",
    user,token
  })
})

module.exports = authRoute