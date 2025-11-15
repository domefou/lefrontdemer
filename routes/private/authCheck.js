// routes/auth.js
const express = require('express');
const router = express.Router();
const { checkJWT } = require('../../middleware/secure');

router.get('/check', checkJWT, (req, res) => {
    res.status(200).json({ user: req.user });
});

module.exports = router; 
