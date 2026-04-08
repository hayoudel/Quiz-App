const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  question: String,
  selected: String,   
  correct: String     
});

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "quiz",
    required: true
  },
  quizTitle: String, 
  answers: [answerSchema],
  score: Number,
  total: Number
}, { timestamps: true });

module.exports = mongoose.model("result", resultSchema);