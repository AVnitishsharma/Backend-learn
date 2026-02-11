const express = require("express")
const userRoute = require("./routes/auth.route")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", userRoute)

module.exports = app