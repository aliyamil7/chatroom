import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("Servidor corriendo en el puerto http://localhost:3000/");
});

const messages: string[] = [];
app.use(express.json());

app.post("/message", (req, res) => {
  console.log(req.body);

  messages.push(req.body.message);

  res.json({
    ok: true,
  });
});

app.get("/messages", (req, res) => {
  res.json({
    messages,
  });
});
