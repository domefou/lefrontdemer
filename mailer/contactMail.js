const dotenv = require('dotenv');
dotenv.config();

const brevo = require('@getbrevo/brevo');

const contactMail = async ({ nom, objet, mail, message }) => {
    // Initialisation du client Brevo
    const client = new brevo.TransactionalEmailsApi();
    client.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

    // Définition du mail
    const email = {
        sender: { email: process.env.BREVO_USER },   // expéditeur validé dans Brevo
        to: [{ email: process.env.BREVO_USER }],     // destinataire (toi-même)
        replyTo: { email: mail },                    // utilisateur du formulaire
        subject: objet,
        textContent: message
    };

    try {
        const result = await client.sendTransacEmail(email);
        console.log("Mail envoyé via API Brevo :", result.messageId || result);
        return result;
    } catch (err) {
        console.error("Erreur API Brevo :", err);
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