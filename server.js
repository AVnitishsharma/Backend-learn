const express = require("express")
const app = express() //server create

app.use(express.json())  //middleware ha  iska use req.boby ke json data ko object bnane ke liye use hota ah

const notes = []

app.post("/notes", (req,res) =>{
  res.send("note created");
  console.log(req.body);
  notes.push(req.body);
  console.log(notes); 
})

app.get("/notes", (req,res)=>{
  res.send(notes)
})

app.delete("/notes/:index", (req,res)=>{
  delete notes[req.params.index]
  res.send("Notes delete sucessfll")
})

app.patch("/notes/:index", (req,res)=>{
  notes[req.params.index].description = req.body.description
  res.send("note updated")
})

app.listen(3000, ()=>{  //server run 
  console.log("Server is runing in port 3000");
})