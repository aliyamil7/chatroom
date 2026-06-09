import express from "express";
import { db } from "./firebase";
import cors from "cors";

const app = express();

const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.post("/message", async (req, res) => {
  const author = req.body.author;
  const message = req.body.message;

  await db.ref("messages").push({
    author,
    text: message,
    createdAt: Date.now(),
  });

  res.json({
    ok: true,
  });
});

app.get("/messages", async (req, res) => {
  const snapshot = await db.ref("messages").get();

  const data = snapshot.val();

  if (!data) {
    return res.json({
      messages: [],
    });
  }

  const messages = Object.values(data);

  res.json({
    messages,
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo`);
});

console.log("PROJECT:", process.env.FIREBASE_PROJECT_ID);
console.log("EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
console.log("KEY:", process.env.FIREBASE_PRIVATE_KEY?.slice(0, 20));
