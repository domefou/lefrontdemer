const express = require('express');
const router = express.Router();
const { checkJWT } = require('../../middleware/secure');
const { contactMail } = require('../../mailer/contactMail.js');


router.post('/', checkJWT, async (req, res) => {
    console.log("Route /contact appelée");
    console.log("Body reçu :", req.body);

    const { nom, objet, mail, message } = req.body;

    try {
        console.log("Tentative d’envoi de mail...");
        await contactMail({ nom, objet, mail, message });
        console.log("Mail envoyé avec succès !");
        res.status(200).json({ success: true, message: 'Message envoyé avec succès' });
    } catch (err) {
        console.error('Erreur d’envoi :', err);
        res.status(500).json({ success: false, message: 'Erreur lors de l’envoi du message' });
    }
});


module.exports = router; 
