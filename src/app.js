//server ko create krna
const noteModel = require("./models/note.models")
const express = require("express")
const app = express()

app.use(express.json())

app.post("/notes",async (req, res)=>{
  const {title , info} = req.body
  const notes = await noteModel.create({
    title, info
  })
  res.status(200).json({
    message:"notes created",
    notes
  })
})

app.get("/notes", async (req,res)=>{
  const notes = await noteModel.find()
  res.status(200).json({
    message:"note are fetched",
    notes
  })
})

module.exports = app