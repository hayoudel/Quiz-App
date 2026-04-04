require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const quizRoutes = require("./routes/quizRoutes");

// Configuration de l'application
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// Connexion MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connecté à MongoDB !"))
  .catch((err) => console.log("Erreur de connexion :", err));

// Routes
app.use("/quiz", quizRoutes);

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
