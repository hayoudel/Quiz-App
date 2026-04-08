require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const quizRoutes = require("./routes/quizRoutes");
const categoryRoutes = require("./routes/categoryRoute");
const userRoutes = require("./routes/userRoute");
const resultRoutes = require("./routes/resultRoute")

// Configuration de l'application
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// Connexion MongoDB
/*mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Connect.é à MongoDB !"))
  .catch((err) => console.log("Erreur de connexion :", err));*/
const mongourl = process.env.MONGO_URL;
mongoose
.connect(mongourl)
.then(() => {
    console.log("DB connectée avec succès");
})
.catch((error) => console.log("Erreur de connexion DB:", error));

// Routes
app.use("/quiz", quizRoutes);
app.use("/category",categoryRoutes);
app.use("/user", userRoutes);
app.use("/result",resultRoutes)

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
