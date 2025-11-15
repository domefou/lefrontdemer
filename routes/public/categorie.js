const express = require('express');
const router = express.Router();
const Categorie = require('../../models/categorie');

//const cloudinary = require('../../cloud/cloudinary'); // corrige le chemin si besoin

router.get('/', async (req, res) => {
    try {

        const categorie = await Categorie.findAll();
        res.json(categorie);
    } catch (error) {
        console.error('Erreur lors de la récupération des categories :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});

module.exports = router;