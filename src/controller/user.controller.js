const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

async function userRegisterController (req, res){
  const {username, email, password, bio, profilepic} = req.body

  const isUserAllreadyExiest = await userModel.findOne({
    $or:[
      {email:email},{username:username}
    ]
  })
  
  if(isUserAllreadyExiest){
    return res.status(409).json({
      message:"user is allready exiest"
    })
  }

  const hash = await bcrypt.hash(password, 10)

  const user = await userModel.create({
    username, email, password:hash, bio, profilepic
  })

  const token = jwt.sign({
    id:user._id
  },process.env.JWT_SECRATE)

  res.cookie("token", token)

  res.status(200).json({
    message:"New user is created",
    user,token
  })
}

async function userLoginController(req, res) {
  const {username, email, password} = req.body

  const user = await userModel.findOne({
    $or:[
      {email:email},{username:username}
    ]
  })

  if(!user){
    return res.status(409).json({
      message:"user not found"
    })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if(!isPasswordValid){
    return res.status(404).json({
      message:"password invalid"
    })
  }

  const token = jwt.sign({
    id:user._id
  },process.env.JWT_SECRATE)

  res.cookie("token", token)

  res.status(200).json({
    message:"login successfully",
    user,token
  })
}

module.exports = {userRegisterController, userLoginController}