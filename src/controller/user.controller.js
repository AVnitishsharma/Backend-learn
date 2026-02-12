const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

async function registerController (req, res){
  console.log(req.body)
  const {username, email, password, bio, profilepic} = req.body

  const ifUserAllreadyExiest = await userModel.findOne({
    $or:[
      {email:email},{username:username}
    ]
  })

  if(ifUserAllreadyExiest){
    return res.status(409).json({
      message:"This user is also avlable" 
    })
  }

  const hash = await bcrypt.hash(password, 10)

  const user = await userModel.create({
    username, email, bio, profilepic, password:hash
  })

  const token = jwt.sign({
    id:user._id
  },process.env.JWT_SECRATE)

  res.cookie("token", token)  

  res.status(200).json({
    messages:"New user is created",
    user,token
  })
}

async function loginController (req, res){
  console.log(req.body)
  const {username, email, password} = req.body

  const user = await userModel.findOne({
    $or:[
      {email:email},{username:username}
    ]
  })

  if(!user){
    return res.status(409).json({
      message:"user is not exiest"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if(!isPasswordValid){
    return res.status(404).json({
      message:"invalid password"
    })
  }

  const token = jwt.sign({
    id:user._id
  },process.env.JWT_SECRATE)

  res.cookie("token", token)  

  res.status(200).json({
    messages:"login is succesfully",
    user,token
  })
}

module.exports = {
  registerController,
  loginController
}