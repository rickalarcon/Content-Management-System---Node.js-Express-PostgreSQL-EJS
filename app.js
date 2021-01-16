const express = require("express");
const mountRoutes = require("./routes");
const db = require("./db/index");
require('dotenv').config();

// needed to load the ejs files
const ejs = require("ejs");
const app = express();

//express template engine
app.set("view engine", "ejs");
//Middleware to send our public assets
app.use(express.static("./public"));
//Parsing json and urlencoded data:
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
mountRoutes(app);

//Routes
app.get("/", async (req, res) => {
  const data = await db.query("SELECT * FROM flashcards");

  res.render("index", { all_flashcards: data }); //this is rendering our file inside views -> we dont need to specific the whole path because we set our view engine above!
  //res.send("getting root!!!");
});


app.listen(process.env.PORT, function(err){ 
    if (err) console.log("Error in server setup") 
    console.log("Server listening on Port", process.env.PORT); 
}) 