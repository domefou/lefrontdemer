const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const statusAcceptedTemplate = require('./template/statusAcceptedTemplate');
const statusRefusedTemplate = require('./template/statusRefusedTemplate');

const statusMail = async ({ nom, mail, date, heure, nbr_couvert, etat }) => {
    // Transporteur Brevo
    const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false, // STARTTLS
        auth: {
            user: process.env.BREVO_USER,     // ton adresse validée dans Brevo
            pass: process.env.BREVO_API_KEY   // ta clé API générée dans Brevo
        }
    });

    if (etat === "acceptée") {
        const mailAccepted = {
            from: process.env.BREVO_USER,     // expéditeur (ton adresse validée)
            to: mail,                         // destinataire (client)
            replyTo: process.env.BREVO_USER,
            subject: 'Mise à jour de votre réservation',
            html: statusAcceptedTemplate({ nom, date, heure, nbr_couvert, etat })
        };
        return transporter.sendMail(mailAccepted);
    }

    if (etat === "refusée") {
        const mailRefused = {
            from: process.env.BREVO_USER,
            to: mail,
            replyTo: process.env.BREVO_USER,
            subject: 'Mise à jour de votre réservation',
            html: statusRefusedTemplate({ nom, date, heure, nbr_couvert, etat })
        };
        return transporter.sendMail(mailRefused);
    }
};

module.exports = { statusMail };


/*
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

*/