const dotenv = require('dotenv');
dotenv.config();

const nodemailer = require('nodemailer');
const tokenTemplate = require('./template/resetPasswordTemplate');

const sendResetMail = async ({ nom, mail, token }) => {
    const resetLink = `${process.env.FRONTEND_URL}/reset/confirm/${token}/${encodeURIComponent(mail)}`;


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lefrontdemer.NoReply@gmail.com',
            pass: process.env.MAILER_APP
        }
    });

    const html = tokenTemplate({ nom, resetLink });

    const tokenMail = {
        from: 'lefrontdemer.NoReply@gmail.com',
        to: mail,
        replyTo: `"${nom}" <${mail}>`,
        subject: 'Réinitialisation de votre mot de passe',
        html
    };

    return transporter.sendMail(tokenMail);
};

module.exports = { sendResetMail };
