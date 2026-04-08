const Categorie = require("../models/categorie");

// Récupérer toutes les catégories
exports.getCategory = async (req, res) => {
  try {
    const categories = await Categorie.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Ajouter une catégorie
exports.createCategory = async (req, res) => {
  try {
    const categorie = new Categorie(req.body);
    await categorie.save();
    res.status(201).json(categorie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier une catégorie
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCategorie = await Categorie.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedCategorie) {
      return res.status(404).json({ message: "Categorie non trouvé" });
    }
    res.json(updatedCategorie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer une catégorie
exports.deleteCategory = async (req, res) => {
  try {
    const deletedCategorie = await Categorie.findByIdAndDelete(req.params.id);
    if (!deletedCategorie) {
      return res.status(404).json({ message: "Categorie non trouvé" });
    }
    res.json({ message: "Categorie supprimé !" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};