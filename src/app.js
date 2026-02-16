const express = require("express")
const cookieParser = require("cookie-parser")
const userRoute = require("./routes/user.routes")
const postRoute = require("./routes/post.routes")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/user", userRoute)
app.use("/post", postRoute)

module.exports = app