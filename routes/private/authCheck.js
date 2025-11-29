// routes/auth.js
const express = require('express');
const router = express.Router();
//const { checkJWT } = require('../../middleware/secure');


router.get('/check', (req, res) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.json({ user: null });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        res.json({
            user: {
                id_user: decoded.userId,
                role: decoded.role
            }
        });
    } catch (err) {
        console.log('🔐 Token invalide ou expiré :', err.message);
        res.json({ user: null });
    }
});

module.exports = router; 
