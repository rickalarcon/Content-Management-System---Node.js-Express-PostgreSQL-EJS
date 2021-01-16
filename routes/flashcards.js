const Router = require("express-promise-router");
const db = require("../db"); //automatically recognized index.js
// create a new express-promise-router
// this has the same API as the normal express router except
// it allows you to use async functions as route handlers

//This is a Mini application (cuz we dont use app here!)
const router = new Router();

// export our router to be mounted by the parent application
module.exports = router;

//Route: flashcard/..
router.get("/", async (req, res) => {
  const data = await db.query("SELECT * FROM flashcards");
  res.send(data);
});

router.post("/", async (req, res) => {
  const values = [
    req.body.id,
    req.body.name,
    new Date(),
    req.body.category,
    req.body.question,
    req.body.answer,
    [req.body.language],
  ];

  const result = await db.insert(values);

  res.send(`returning : ${result}`);
});

router.post("/add_lang", async (req, res) => {
  const values = [req.body.language, req.body.id];
  console.log(values);
  const result = await db.update(values);
  res.send(`returning: ${result}`);
});


