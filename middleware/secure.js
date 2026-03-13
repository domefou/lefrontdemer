
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const User = require('../models/user');
dotenv.config(); // Charge les variables d'environnement

function checkJWT(req, res, next) {
    const token = req.cookies?.token;

    if (!token) {
        console.log('🔒 Aucun token fourni');
        return res.status(401).json({ message: 'Authentification échouée : aucun token' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Uniformiser les noms pour correspondre à la base
        req.user = {
            id_user: decoded.userId, // ← correspond à la table
            role: decoded.role
        };

        next();
    } catch (err) {
        console.log('🔐 Token invalide ou erreur utilisateur :', err.message);
        return res.status(403).json({ message: 'Token invalide' });
    }
}

const mailVerify = async (req, res, next) => {
    const { token, mail } = req.params;

    if (!token) {
        console.log('🔒 Aucun token fourni');
        return res.status(401).json({ message: 'Authentification échouée : aucun token' });
    }

    try {
        const user = await User.findOne({ where: { mail } });
        if (!user) {
            console.log('❌ Utilisateur introuvable');
            return res.status(403).json({ message: 'Email invalide' });
        }

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            req.user = {
                id_user: decoded.id_user,
                mail: decoded.mail
            };

            next();
        } catch (err) {
            console.log('🔐 Token invalide :', err.message);
            return res.status(403).json({ message: 'Token invalide ou expiré' });
        }
    } catch (err) {
        console.log('💥 Erreur serveur :', err.message);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
};

module.exports = { checkJWT, mailVerify };
