const mongoose = require("mongoose");


const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correct: String
});

const quizSchema = new mongoose.Schema({
  title: String,
  categorie: { type: mongoose.Schema.Types.ObjectId, ref: "categorie", required: true },
  questions: [questionSchema]
});
module.exports = mongoose.model("quiz", quizSchema);
