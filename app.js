import express from "express";
import Contenedor from "./managers/contenedor.js";

const MyStorage = new Contenedor();
const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

app.get("/", async (req, res) => {
  res.send("Hello World");
});

app.get("/products", async (req, res) => {
  let allProducts = await MyStorage.getAll();
  res.send(allProducts);
});

app.get("/randomProduct", async (req, res) => {
  let randomNumber = Math.floor(Math.random() * 4 + 1);
  let randomProduct = await MyStorage.getById(randomNumber);
  res.send(randomProduct);
});

app.get("/info", (req, res) => {
  console.log(req.query);
  let role = req.query.role;
  let apellido = req.query.joaquin;
  if (role) {
    res.send(role);
  } else if (apellido) {
    res.send(apellido);
  }
});

app.post("/api/palabras", (req, res) => {
  let newWord = req.body.word;
});
