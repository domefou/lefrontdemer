const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config();

const contactMail = async ({ nom, objet, mail, message }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lefrontdemer.NoReply@gmail.com',
            pass: process.env.MAILER_APP // ⚠️ doit être un App Password Gmail
        }
    });

    const mailOptions = {
        from: `"${nom}" <${mail}>`,
        to: 'lefrontdemer.NoReply@gmail.com',
        replyTo: mail,
        subject: objet,
        text: message
    };

    return transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Erreur NodeMailer :", err);
        } else {
            console.log("Mail envoyé :", info.response);
        }
    });
};



module.exports = { contactMail };

