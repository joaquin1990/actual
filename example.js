import express from "express";

const app = express();
const server = app.listen(8080, () => console.log("Listening on 8080"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// End points de ejemplo de Usuarios:

// let users = ["maria", "Manuel", "Mauricio", "papa"];
// app.get("/users", (req, res) => {
//   //Trae todos los users
//   res.send({ users });
// });
// app.get("/users/:userId", (req, res) => {
//   console.log(req.params);
//   console.log(req.params);
//   let id = req.params.userId;
//   res.send(users[id - 1]);
// });

// Ejemplos con Get: notar que usamos req.params
let sentence = "Hola mundo cómo están";
app.get("/api/frase", (req, res) => {
  res.send({ sentence });
});
app.get("/api/letras/:num", (req, res) => {
  if (isNaN(req.params.num))
    return res.status(400).send({ error: "El valor no es numérico" });
  if (
    parseInt(req.params.num) < 1 ||
    parseInt(req.params.num) > sentence.length
  )
    return res.status(404).send("No hay letra con este índice");
  let num = parseInt(req.params.num);
  res.send({ letter: sentence.charAt(num - 1) });
});

app.get("/api/palabras/:num", (req, res) => {
  let sentenceArray = sentence.split(" ");
  if (isNaN(req.params.num))
    return res.status(400).send({ error: "El valor no es numerico" });
  if (
    parseInt(req.params.num) < 1 ||
    parseInt(req.params.num) > sentenceArray.length
  )
    return res.status(400).send({ error: "No hay palabra con ese índice" });
  let num = parseInt(req.params.num);
  res.send({ word: sentenceArray[num - 1] });
});

// Ejemplos con POST: agregando una palabra.
app.post("/api/palabras", (req, res) => {
  let newWord = req.body.word;
  sentence = sentence.concat(` ${newWord}`);
  res.send({ added: newWord });
});

// Ejemplo con PUT: reemplazando una palabra.
app.put("/api/palabras/:num", (req, res) => {
  let newWord = req.body.word;
  let newSentence = sentence.split(" ");
  if (isNaN(req.params.num))
    return res.status(400).send({ error: "El valor no es numerico" });
  if (
    parseInt(req.params.num) < 1 ||
    parseInt(req.params.num) > newSentence.length
  )
    return res.status(400).send({ error: "No hay palabra con ese índice" });
  let oldWord = newSentence[parseInt(req.params.num - 1)];
  newSentence[parseInt(req.params.num) - 1] = newWord;
  sentence = newSentence.join(" ");
  res.send({ previous: oldWord, new: newWord });
});

// Ejemplo con DELETE: elimino una palabra en una detemrinada posicion
app.delete("/api/palabras/:num", (req, res) => {
  let newSentence = sentence.split(" ");
  if (isNaN(req.params.num))
    return res.status(400).send({ error: "El valor no es numerico" });
  if (
    parseInt(req.params.num) < 1 ||
    parseInt(req.params.num) > newSentence.length
  )
    return res.status(400).send({ error: "No hay palabra con ese índice" });
  newSentence.splice([parseInt(req.params.num) - 1], 1);
  sentence = newSentence.join(" ");
  res.send(sentence);
});
