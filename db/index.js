const {Client} = require("pg");
require('dotenv').config();

//connecting out server with our database
const client = new Client({
  user:     process.env.PGUSERNAME,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host:     process.env.PGHOST,
  port:     process.env.PGPORT,
});

client.connect((err) => {
  if (err) throw err;
  console.log("db client connected..");
});

const insert =
  "INSERT INTO flashcards VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *";

const update =
  "UPDATE flashcards SET supported_lang = array(select distinct unnest(array_append(supported_lang,$1)))  WHERE id = $2";

module.exports = {
  query: (text) =>
    client
      .query(text)
      .then((res) => {
        console.log("Got Flahcards!");
        return res.rows;
      })
      .catch((err) => {
        console.log("Error: Cant Get Flashcards!");
      }),
  insert: (values) =>
    client
      .query(insert, values)
      .then((res) => {
        return "Data inserted Successfully!";
      })
      .catch((err) => {
        return err.stack;
      }),
  update: (values) =>
    client
      .query(update, values)
      .then((res) => {
        return "Data updated Successfully!";
      })
      .catch((err) => {
        return err.stack;
      }),
};