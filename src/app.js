const express = require("express")
const app = express()
const authRoute = require("./routes/auth.route")
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())  //ye cookie ko save krne bala middleware hai

app.use("/api", authRoute)


module.exports = app