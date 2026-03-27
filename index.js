const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Exercise = require("./models/exercise");

const app = express();
const PORT = process.env.PORT || 3000;
/* ---------- CORS ---------- */
app.use(
  cors({
    origin: true, // tillåter alla origins (bra i development)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(express.json());

/* ---------- Disable Cache ---------- */
app.use((req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

/* ---------- Routes ---------- */
app.get("/exercises", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.status(200).json(exercises);
  } catch (error) {
    console.error("Error fetching exercises:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

/* ---------- MongoDB + Start Server ---------- */
mongoose
  .connect("mongodb+srv://denr0001:denr123@cluster0.nf7gymi.mongodb.net/gymdb")
  .then(() => {
    console.log("Connected to MongoDB Atlas");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
