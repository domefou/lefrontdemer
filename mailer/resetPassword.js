const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');
const tokenTemplate = require('./template/resetPasswordTemplate');
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const sendResetMail = async ({ nom, mail, token }) => {
    const resetLink = `${API_URL}/${process.env.FRONTEND_URL}/reset/confirm/${token}/${encodeURIComponent(mail)}`;

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

    const html = tokenTemplate({ nom, resetLink });

    const tokenMail = {
        from: process.env.BREVO_USER,       // expéditeur (ton adresse validée)
        to: mail,                           // destinataire (utilisateur qui reset son mot de passe)
        replyTo: process.env.BREVO_USER,
        subject: 'Réinitialisation de votre mot de passe',
        html
    };

    try {
        const info = await transporter.sendMail(tokenMail);
        console.log("Mail de reset envoyé via Brevo :", info.messageId);
        return info;
    } catch (err) {
        console.error("Erreur envoi reset mail via Brevo :", err);
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