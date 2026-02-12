const express = require("express")
const cookieParser = require("cookie-parser")
const userRouth = require("./routes/user.route")
const postRoute = require("./routes/post.route")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/user", userRouth)
app.use("/create", postRoute)

module.exports = app