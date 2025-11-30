const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const contactMail = async ({ nom, objet, mail, message }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.BREVO_USER,
            pass: process.env.BREVO_API_KEY
        },
        tls: { rejectUnauthorized: false },
        connectionTimeout: 10000
    });

    const mailOptions = {
        from: process.env.BREVO_USER,       // expéditeur validé
        to: process.env.BREVO_USER,         // destinataire (toi)
        replyTo: `"${nom}" <${mail}>`,      // utilisateur du formulaire
        subject: objet,
        text: message
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Mail envoyé via Brevo :", info.messageId);
        return info;
    } catch (err) {
        console.error("Erreur NodeMailer/Brevo :", err);
        throw err;
    }
};


module.exports = { contactMail };


/* Alternative transporter gmail incompatible sur Render.com
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
*/