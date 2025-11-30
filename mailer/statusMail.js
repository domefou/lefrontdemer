const dotenv = require('dotenv');
dotenv.config();

const brevo = require('@getbrevo/brevo');
const statusAcceptedTemplate = require('./template/statusAcceptedTemplate');
const statusRefusedTemplate = require('./template/statusRefusedTemplate');

const statusMail = async ({ nom, mail, date, heure, nbr_couvert, etat }) => {
    // Initialisation du client Brevo
    const client = new brevo.TransactionalEmailsApi();
    client.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    let htmlContent;

    if (etat === "acceptée") {
        htmlContent = statusAcceptedTemplate({ nom, date, heure, nbr_couvert, etat });
    } else if (etat === "refusée") {
        htmlContent = statusRefusedTemplate({ nom, date, heure, nbr_couvert, etat });
    } else {
        throw new Error("État de réservation invalide");
    }

    // Définition du mail
    const email = {
        sender: { email: process.env.BREVO_USER },   // expéditeur validé dans Brevo
        to: [{ email: mail }],                       // destinataire (client)
        replyTo: { email: process.env.BREVO_USER },
        subject: 'Mise à jour de votre réservation',
        htmlContent
    };

    try {
        const result = await client.sendTransacEmail(email);
        console.log("Mail de statut envoyé via API Brevo :", result.messageId || result);
        return result;
    } catch (err) {
        console.error("Erreur envoi statut via API Brevo :", err);
        throw err;
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