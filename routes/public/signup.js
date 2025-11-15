const express = require('express');
const router = express.Router();
const { createUser } = require('../../services/user');

// GET /signup — Affiche la page d'inscription et supprime le token si présent
router.get('/', (req, res) => {
    try {
        if (req.cookies?.token) {
            console.log('🔐 Jeton présent, suppression...');
            res.clearCookie('token');
            console.log('✅ Jeton supprimé.');
        }

        // Ici tu peux rendre une vue ou envoyer un message
        res.status(200).json({ message: 'Bienvenue sur la page d’inscription.' });
    } catch (error) {
        console.error('❌ Erreur lors du rendu de la page signup:', error);
        res.status(500).json({ message: "Erreur serveur", error });
    }
});

// POST /signup — Crée un utilisateur et redirige vers /login
router.post('/', async (req, res) => {
    console.log('Reçu :', req.body);
    try {
        const user = await createUser(req); // Ne touche pas à res dans createUser
        return res.status(201).json({ message: 'Utilisateur créé avec succès', userId: user.id_user });
    } catch (error) {
        console.error('Erreur :', error.message);
        return res.status(400).json({ message: error.message });
    }
});



module.exports = router;
