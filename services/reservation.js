
const { User, Reservation } = require('../models/indexation');

const { Op } = require("sequelize");


const { statusMail } = require('../mailer/statusMail');



const OneReservation = async (req, res) => {
    const id_user = req.user.id_user;

    // ou req.body selon ta route

    try {
        const user = await User.findByPk(id_user);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        const reservations = await Reservation.findAll({
            where: { id_user },
            include: { model: User, as: 'User' }


        });

        if (reservations.length > 0) {
            res.json({ reservations });
        } else {
            res.status(404).json({ message: "Aucune réservation trouvée" });
        }

    } catch (err) {
        console.error("Erreur serveur :", err);
        res.status(500).json({ message: "Erreur serveur lors de la récupération" });
    }
};




const AllReservation = async (req, res) => {
    try {
        // 1️⃣ Mettre à jour toutes les réservations "en attente" dont la date est passée
        await Reservation.update(
            { etat: "refusé" },
            {
                where: {
                    etat: "en attente",
                    date: { [Op.lt]: new Date() } // date < maintenant
                }
            }
        );

        // 2️⃣ Récupérer toutes les réservations après la mise à jour
        const reservations = await Reservation.findAll({
            include: { model: User, as: 'User' },
            order: [["date", "DESC"], ["heure", "DESC"]] // tri du plus récent au plus ancien
        });

        res.json({ reservations });
    } catch (err) {
        console.error("Erreur serveur :", err);
        res
            .status(500)
            .json({ message: "Erreur serveur lors de la récupération" });
    }
};


const addNewReservation = async (req, res) => {
    try {
        const id_user = req.user?.id_user; // récupéré via ton middleware d’auth
        if (!id_user) return res.status(401).json({ message: "Utilisateur non authentifié" });

        const { date, heure, nbr_couvert } = req.body;

        const created = await Reservation.create({
            id_user,
            date,
            heure,
            nbr_couvert
        });

        res.json({ message: "Réservation ajoutée avec succès", reservation: created });
    } catch (err) {
        console.error("Erreur serveur :", err);
        res.status(500).json({ message: "Erreur serveur lors de la création" });
    }
};






const updateReservation = async (req, res) => {
    const { id_reservation } = req.params;
    const { date, heure, nbr_couvert, etat } = req.body;

    const updateData = { date, heure, nbr_couvert, etat };

    console.log("📥 Données reçues :", req.body);
    console.log("🆔 ID réservation :", id_reservation);

    try {
        const [updated] = await Reservation.update(updateData, {
            where: { id_reservation }
        });

        console.log("🔧 Résultat de Reservation.update :", updated);

        if (updated > 0) {
            const reservation = await Reservation.findByPk(id_reservation, {
                include: { model: User, as: 'User' }

            });

            console.log("🔍 Réservation complète :", reservation);

            const user = reservation?.User;

            console.log("👤 Utilisateur récupéré :", user);

            if (etat !== 'en attente' && user?.mail) {
                try {
                    console.log("📧 Envoi du mail à :", user.mail);

                    const info = await statusMail({
                        nom: user.nom,
                        mail: user.mail,
                        date,
                        heure,
                        nbr_couvert,
                        etat
                    });

                    console.log("✅ Mail envoyé à :", user.mail);


                } catch (mailErr) {
                    console.error("❌ Erreur lors de l'envoi du mail :", mailErr);
                }
            }

            res.json({ message: 'Réservation mise à jour avec succès' });
        } else {
            res.status(404).json({ message: 'Aucune modification effectuée' });
        }

    } catch (err) {
        console.error("💥 Erreur serveur :", err);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour' });
    }
};






const deleteReservation = async (req, res) => {
    try {
        const id = parseInt(req.params.id_reservation, 10);
        if (isNaN(id)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        const deleted = await Reservation.destroy({ where: { id_reservation: id } });

        if (deleted > 0) {
            res.json({ message: "Réservation supprimée avec succès" });
        } else {
            res.status(404).json({ message: "Réservation non trouvée" });
        }
    } catch (err) {
        console.error("Erreur serveur :", err);
        res.status(500).json({ message: "Erreur serveur lors de la suppression" });
    }
};



module.exports = {
    OneReservation: OneReservation,
    AllReservation: AllReservation,
    addNewReservation: addNewReservation,
    updateReservation: updateReservation,
    deleteReservation: deleteReservation
};
