const express = require("express");
const router = express.Router();
const quizController = require("../controllers/categorieController");

router.get("/", quizController.getCategory );               // Récupérer toute les categories 
router.post("/", quizController.createCategory);  // Ajouter une categorie
router.put("/update/:id", quizController.updateCategory);              
router.delete("/:id", quizController.deleteCategory);            // Supprimer une categorie


module.exports = router;