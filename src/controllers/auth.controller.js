const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

async function registerController (req , res){
  console.log(req.body)
  const {email, password, bio, username, dp} = req.body

  const isUserAlreadyExist = await userModel.findOne({
    $or:[
      {email:email},{username:username}
    ]
  })

  if(isUserAlreadyExist){
    return res.status(409).json({
      message:"This user is also avlable" 
    })
  }

  hash = crypto.createHash("md5").update(password).digest("hex")

  const user = await userModel.create({
    username, email, bio, dp, password:hash
  })

  const token = jwt.sign({
    id:user._id
  },process.env.JWT_SECRET)

  res.cookie("token", token)

  res.status(200).json({
    message:"user is created",
    user,token
  })
}

async function loginController (req , res) {
  console.log(req.body)
  const {email, username, password} = req.body

  const user = await userModel.findOne({
    $or:[
      {email:email},{username:username}
    ]
  })

  if(!user){
    return res.status(409).json({
      message:"this user is not found" 
    })
  }

  hash = crypto.createHash("md5").update(password).digest("hex")

  const isPasswordValid = hash === user.password

  if(!isPasswordValid){
    return res.status(401).json({
      message:"password is invalide"
    })
  }

  const token = jwt.sign(
    { id:user._id }
    ,process.env.JWT_SECRET,
    {expiresIn:"1d"}
  )

  res.cookie("token", token)

  res.status(200).json({
    message:"user is login",
    user:{
      username:user.username,
      email:user.email,
      bio:user.bio,
      dp:user.dp
    }
  })
}

module.exports = {
  registerController ,loginController
}