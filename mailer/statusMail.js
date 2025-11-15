const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const statusAcceptedTemplate = require('./template/statusAcceptedTemplate'); // si tu l’utilises
const statusRefusedTemplate = require('./template/statusRefusedTemplate');

const statusMail = async ({ nom, mail, date, heure, nbr_couvert, etat }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lefrontdemer.NoReply@gmail.com',
            pass: process.env.MAILER_APP
        }
    });

    if (etat === "acceptée") {
        const mailAccepted = {
            from: 'lefrontdemer.NoReply@gmail.com',
            to: mail,
            replyTo: `"${nom}" <${mail}>`,
            subject: 'Mise à jour de votre réservation',
            html: statusAcceptedTemplate({ nom, date, heure, nbr_couvert, etat })
        };
        return transporter.sendMail(mailAccepted);
    }

    if (etat === "refusée") {
        const mailRefused = {
            from: 'lefrontdemer.NoReply@gmail.com',
            to: mail,
            replyTo: `"${nom}" <${mail}>`,
            subject: 'Mise à jour de votre réservation',
            html: statusRefusedTemplate({ nom, date, heure, nbr_couvert, etat })
        };
        return transporter.sendMail(mailRefused);
    }
};

module.exports = { statusMail };

