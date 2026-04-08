const Quiz = require("../models/quiz");
const Categorie = require("../models/categorie");
// Récupérer tous les quiz
exports.getQuizzes = async (req, res) => {
    const quizzes = await Quiz.find().populate("categorie");
  res.json(quizzes);
};
// Ajouter un quiz
exports.createQuiz = async (req, res) => {
  try {
    const { categorie } = req.body;

    const cat = await Categorie.findById(categorie);
    if (!cat) {
      return res.status(400).json({ message: "La catégorie n'existe pas !" });
    }

    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(await Quiz.findById(quiz._id).populate("categorie"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// modifier un quiz 
exports.updateQuiz = async (req, res) => {
    try {
    const { id } = req.params;
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      req.body,
      { new: true } 
    );
    if (!updatedQuiz) {
      return res.status(404).json({ message: "Quiz non trouvé" });
    }
    res.json(updatedQuiz);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Supprimer un quiz
exports.deleteQuiz = async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.id);
  res.json({ message: "Quiz supprimé !" });
};

// quiz par categorie 

exports.filtreCategory = async (req, res) => {
  try {
    const { categorie } = req.query; // on récupère le paramètre query ?categorie=NomCategorie

    let filter = {};
    if (categorie) {
      // Cherche la catégorie par nom
      const cat = await Categorie.findOne({ nom: categorie });
      if (!cat) {
        return res.status(404).json({ message: "Catégorie non trouvée" });
      }
      filter.categorie = cat._id;
    }

    const quizzes = await Quiz.find(filter).populate("categorie");
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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