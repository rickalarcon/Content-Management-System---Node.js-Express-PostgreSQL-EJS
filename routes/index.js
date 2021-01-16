/*
flashcards -> is the router we created in the flashcard.js file
the app.use() is a middleware that fires up if we get a 
request for that route. 

*/
const flashcards = require("./flashcards");

module.exports = (app) => {
  app.use("/flashcards", flashcards);
  // etc..
};