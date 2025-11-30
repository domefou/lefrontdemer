const dotenv = require('dotenv');
dotenv.config();

const brevo = require('@getbrevo/brevo');
const tokenTemplate = require('./template/resetPasswordTemplate');

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const sendResetMail = async ({ nom, mail, token }) => {
    const resetLink = `${API_URL}/${process.env.FRONTEND_URL}/reset/confirm/${token}/${encodeURIComponent(mail)}`;

    // Initialisation du client Brevo
    const client = new brevo.TransactionalEmailsApi();
    client.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    // Génération du contenu HTML via ton template
    const html = tokenTemplate({ nom, resetLink });

    // Définition du mail
    const email = {
        sender: { email: process.env.BREVO_USER },   // expéditeur validé dans Brevo
        to: [{ email: mail }],                       // destinataire (utilisateur qui reset son mot de passe)
        replyTo: { email: process.env.BREVO_USER },
        subject: 'Réinitialisation de votre mot de passe',
        htmlContent: html
    };

    try {
        const result = await client.sendTransacEmail(email);
        console.log("Mail de reset envoyé via API Brevo :", result.messageId || result);
        return result;
    } catch (err) {
        console.error("Erreur envoi reset mail via API Brevo :", err);
        throw err;
    }
};

module.exports = { sendResetMail };


/* Alternative transporter gmail incompatible sur Render.com

const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');
const tokenTemplate = require('./template/resetPasswordTemplate');
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const sendResetMail = async ({ nom, mail, token }) => {
    const resetLink = `${API_URL}/${process.env.FRONTEND_URL}/reset/confirm/${token}/${encodeURIComponent(mail)}`;

    const transporter = nodemailer.createTransport({
        service: 'gmail', auth: {
            user: 'lefrontdemer.NoReply@gmail.com',
            pass: process.env.MAILER_APP
        }
    });

    const html = tokenTemplate({ nom, resetLink });

    const tokenMail = {
        from: 'lefrontdemer.NoReply@gmail.com',
        to: mail, replyTo: `"${nom}" <${mail}>`,
        subject: 'Réinitialisation de votre mot de passe',
        html
    }; return transporter.sendMail(tokenMail);
};

module.exports = { sendResetMail };
*/