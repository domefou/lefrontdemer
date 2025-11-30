const express = require('express');
const router = express.Router();
const { statusMail } = require('../../mailer/statusMail');
const { AllReservation } = require('../../services/reservation');
const { checkJWT } = require('../../middleware/secure');

router.put('/:id_reservation', checkJWT, async (req, res) => {
    const { etat, date, heure, nbr_couvert } = req.body;
    const { id_reservation } = req.params;


    try {
        await AllReservation(id_reservation, etat);

        if (etat !== "en attente") {
            const reservation = await getReservationById(id_reservation);
            const user = reservation.User; // attention à la casse : Sequelize inclut souvent en majuscule

            if (!user || !user.mail) {
                console.warn("⚠️ Utilisateur ou mail introuvable pour la réservation :", id_reservation);
            } else {
                await statusMail({
                    nom: user.nom,
                    mail: user.mail,
                    message: `Bonjour ${user.nom}, votre réservation a été ${etat}.`
                });
            }
        }

        res.status(200).json({ success: true, message: 'Statut mis à jour et mail envoyé.' });
    } catch (err) {
        console.error('❌ Erreur lors de la mise à jour :', err.message);
        res.status(500).json({ success: false, message: 'Erreur serveur.' });
    }
});

module.exports = router; 