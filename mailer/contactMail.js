const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config();

const contactMail = async ({ nom, objet, mail, message }) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'lefrontdemer.NoReply@gmail.com',
            pass: process.env.MAILER_APP
        }
    });

    const mailOptions = {
        from: `"${nom}" <${mail}>`, // expéditeur
        to: 'lefrontdemer.NoReply@gmail.com', // destinataire
        replyTo: mail,
        subject: objet,
        text: message
    };


    return transporter.sendMail(mailOptions);
};


module.exports = { contactMail };

