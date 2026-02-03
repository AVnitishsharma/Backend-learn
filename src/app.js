//server ko create krna

const express = require("express")
const noteModel = require("./models/note.models")
const app = express()

app.use(express.json()) //middleware

app.post("/notes", async(req, res)=>{
  const {title, disc} = req.body

  const note = await noteModel.create({
    title, disc
  })

  res.status(201).json({
    message: "note created",
    note
  })
})

app.get("/notes", async (req, res)=>{
  const notes = await noteModel.find()

  res.status(200).json({
    message: "Note fetch",
    notes
  })
})
module.exports = app