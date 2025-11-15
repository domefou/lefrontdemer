const express = require('express');
const router = express.Router();
//const { checkJWT } = require('../../middleware/secure');
const { contactMail } = require('../../mailer/contactMail.js');


router.post('/', async (req, res) => {
    const { nom, objet, mail, message } = req.body;

    try {
        await contactMail({ nom, objet, mail, message });
        res.status(200).json({ success: true, message: 'Message envoyé avec succès' });
    } catch (err) {
        console.error('Erreur d’envoi :', err);
        res.status(500).json({ success: false, message: 'Erreur lors de l’envoi du message' });
    }
});

module.exports = router; 
