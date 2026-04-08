const express = require("express");
const router = express.Router();
const quizController = require("../controllers/quizController");

router.get("/", quizController.getQuizzes);               // Récupérer tous les quiz
router.post("/", quizController.createQuiz);             // Ajouter un quiz
router.put("/update/:id", quizController.updateQuiz);              
router.delete("/:id", quizController.deleteQuiz);            // Supprimer un quiz
router.get("/filtre",  quizController.filtreCategory)
router.post("/results", quizController.saveResult);          // Sauvegarder un résultat
router.get("/results", quizController.getResults);           // Récupérer tous les résultats

module.exports = router;