const express = require("express")
const cookieParser = require("cookie-parser")
const userRoute = require("./routes/user.route")
const postRoute = require("./routes/post.route")


const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/user", userRoute)
app.use("/create", postRoute)


module.exports = app