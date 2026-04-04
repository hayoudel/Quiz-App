const Quiz = require("../models/quiz");
// Récupérer tous les quiz
exports.getQuizzes = async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
};
// Ajouter un quiz
exports.createQuiz = async (req, res) => {
  const newQuiz = new Quiz(req.body);
  await newQuiz.save();
  res.json({ message: "Quiz ajouté !" });
};

// Supprimer un quiz
exports.deleteQuiz = async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.id);
  res.json({ message: "Quiz supprimé !" });
};




// route pour les résultats
const Result = require("../models/result");
// Sauvegarder un résultat
exports.saveResult = async (req, res) => {
  const newResult = new Result(req.body);
  await newResult.save();
  res.json({ message: "Résultat sauvegardé !" });
};
// Récupérer tous les résultats
exports.getResults = async (req, res) => {
  const results = await Result.find().sort({ date: -1 });
  res.json(results);
};