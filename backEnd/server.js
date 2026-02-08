import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json())

const quotes = [
  {
    quote:
      "Either write something worth reading or do something worth writing.",
    author: "Benjamin Franklin",
  },
  {
    quote: "I should have been more kind.",
    author: "Clive James",
  },
];

function randomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

app.get("/", (req, res) => {
  const quote = randomQuote();
  res.send(`"${quote.quote}" -${quote.author}`); // ⬅️ بدون تغییر
});

app.post("/", (req, res) => {
  const { quote, author } = req.body; // ✅ به‌جای پارس دستی

  if (!quote || !author) {
    return res
      .status(400)
      .send("Expected body to contain quote and author.");
  }

  quotes.push({ quote, author });
  res.send("ok");
});

app.listen(PORT, () => {
  console.log(`Quote server listening on port ${PORT}`);
});
