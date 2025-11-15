const express = require('express');
const router = express.Router();

// Route de déconnexion


router.get('/', (req, res) => {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Strict' });
    return res.status(200).json({ message: 'Déconnexion réussie.' });
});

module.exports = router;

