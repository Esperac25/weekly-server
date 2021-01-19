const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a items

app.post('/items', async (req, res) => {
  try {
    const { description } = req.body;
    const newItem = await pool.query(
      "INSERT INTO items (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//get all items

app.get('/items', async (req, res) => {
  try {
    const allItems = await pool.query("SELECT * FROM items");
    await res.json(allItems.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a items

app.get('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const items = await pool.query("SELECT * FROM items WHERE item_id = $1", [
      id
    ]);

    res.json(items.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update a items

app.put('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateItem = await pool.query(
      "UPDATE items SET description = $1 WHERE item_id = $2",
      [description, id]
    );

    res.json("item was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a items

app.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteItem = await pool.query("DELETE FROM items WHERE item_id = $1", [
      id
    ]);
    res.json("item was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.use(function errorHandler(error, req, res, next) {
  let response;

  response = { error: { message: 'server error' } };
  console.error(error);

  res.status(500).json(response);
});

app.get("/", (req, res) => {
  res.send("Hello this is the weekly api!");
});

app.listen(process.env.PORT, () => {
  console.log(`server has started on port ${process.env.PORT}`);
});