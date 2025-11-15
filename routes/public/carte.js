const express = require('express');
//const { checkJWT } = require('../../middleware/secure'); // ✅ destructuration

const Article = require('../../models/article');
const Menu = require('../../models/menu');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const menu = await Menu.findAll();
        const articles = await Article.findAll();

        // Si l'utilisateur est authentifié, redirige vers /user/carte
        //if (req.user) {
        //    return res.redirect('/user/carte');
        //}

        // Sinon, renvoie les données
        res.json({ articles, menu });
    } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});


module.exports = router;



