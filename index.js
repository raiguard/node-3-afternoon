require("dotenv").config();

const express = require("express");
const massive = require("massive");
const cont = require("./productsController");

const app = express();

const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive({
  connectionString: CONNECTION_STRING,
  ssl: {
    rejectUnauthorized: false
  }
})
  .then((db) => {
    app.set("db", db);
    console.log("Established database connection");
  })
  .catch((err) => console.log(err));

app.use(express.json());

app.get("/api/products", cont.getAll);
app.get("/api/products/:id", cont.getOne);
app.put("/api/products/:id", cont.update);
app.post("/api/products", cont.create);
app.delete("/api/products/:id", cont.delete);

app.listen(SERVER_PORT, () => console.log(`Server is listening on port ${SERVER_PORT}`));
