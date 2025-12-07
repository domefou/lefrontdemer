const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { resetPassword } = require('../mailer/resetPassword');

/**
 * Authentifie un utilisateur en fonction de son mail et de son mot de passe.
 */
const authenticate = async (req, res) => {
    const { mail, password } = req.body;

    if (!mail || !password) {
        return res.status(400).json({ message: "Champs requis manquants." });
    }

    if (password.length < 8) {
        return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères." });
    }

    try {
        const user = await User.findOne({ where: { mail } });

        if (!user) {
            return res.status(401).json({ message: "Utilisateur introuvable" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Mot de passe incorrect." });
        }

        // ✅ Utiliser process.env.SECRET_KEY
        const token = jwt.sign(
            { userId: user.id_user, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: 24 * 60 * 60 }
        );

        // ✅ Utiliser process.env.NODE_ENV
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Render est en HTTPS
            sameSite: 'None',                              // indispensable pour cross-site
            maxAge: 24 * 60 * 60 * 1000                    // 24h
        });

        return res.status(200).json({
            message: "Connexion réussie",
            user: {
                id: user.id_user,
                mail: user.mail,
                role: user.role,
                nom: user.nom
            }
        });
    } catch (error) {
        console.error("Erreur serveur :", error);
        return res.status(500).json({ message: "Erreur du serveur interne", erreur: error.message });
    }
};





//on crée une fonction qui va chercher un utilisateur par son id
/**
 * Récupère un utilisateur en fonction de son nom ou de son mail.

 */
const getById = async (req, res, next) => {
    let name = req.params.name || req.body.name;
    let mail = req.params.mail || req.body.mail;

    try {
        if (mail) {
            let usermail = await User.findOne({ mail: mail });
            if (usermail) {
                req.session.successMessage = `Utilisateur trouvé.`;
                return res.redirect(`/user/compte`);
            }
        }
        if (name) {
            let userName = await User.findOne({ name: name });
            if (userName) {
                const mail = userName.mail;
                req.session.successMessage = `Utilisateur trouvé.`;
                return res.redirect(`/user/compte`);
            }
        }
        if (!mail && !name) {
            req.session.errorMessage = `veuillez saisir un nom ou un mail.`;
            return res.redirect(`/user/compte`);
        }
        else {
            req.session.errorMessage = `Utilisateur introuvable.`;
            console.log("Redirection vers : /admin/user");
            return res.redirect(`/admin/user`);
        }
    } catch (error) {
        console.error("Erreur dans getById :", error);
        return res.status(500).json({ error: error.message });
    }
};



//on crée une fonction qui va ajouter un utilisateur
/**
 * Ajoute un nouvel utilisateur au système.

 */
const createUser = async (req) => {
    const { nom, mail, password } = req.body;

    if (!nom || !mail || !password) {
        throw new Error('Tous les champs sont requis.');
    }

    if (password.length < 8) {
        throw new Error('Le mot de passe doit contenir au moins 8 caractères.');
    }

    const hashedPassword = await bcrypt.hash(password, 10); // 🔐 Hash du mot de passe

    const role = mail === "admin@mail.com" ? "admin" : "user";

    const user = await User.create({
        nom,
        mail,
        password: hashedPassword, // ✅ Stocke le mot de passe hashé
        role
    });

    return user;
};



/**
 * Met à jour le mot de passe d'un utilisateur en fonction de son mail et de sa réponse secrète.
*/

const passwordUpdate = async (req, res) => {
    const { password } = req.body;
    const { id_user } = req.user; // injecté par checkJWT

    try {
        if (!password || password.length < 8) {
            return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères' });
        }

        const user = await User.findByPk(id_user);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        user.password = await bcrypt.hash(password, 10);
        await user.save();

        return res.status(200).json({ message: 'Mot de passe mis à jour avec succès' });
    } catch (error) {
        console.error("passwordUpdate : erreur", error);
        return res.status(500).json({ message: "Erreur serveur lors de la mise à jour" });
    }
};








const newPassword = async (req, res) => {
    const { newPassword } = req.body;
    const { id_user, mail } = req.user;

    console.log('nouveau mdp :', newPassword, 'id utilisateur :', id_user, 'email :', mail);

    try {
        const user = await User.findByPk(id_user);
        if (!user || user.mail !== mail) {
            return res.status(404).json({ message: "Utilisateur introuvable ou non autorisé" });
        }

        if (!newPassword || newPassword.length < 8) {
            return res.status(400).json({ message: "Le mot de passe doit contenir au moins 8 caractères." });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.status(200).json({ message: "Mot de passe mis à jour avec succès" });
    } catch (error) {
        console.error("newPassword : erreur", error);
        return res.status(500).json({ message: "Erreur serveur lors de la mise à jour" });
    }
};









// envoie de token par mail pour reinitialiser le mot de passe

const { generateResetToken } = require('../mailer/tokenMail');
const { sendResetMail } = require('../mailer/resetPassword');

const requestReset = async (req, res) => {
    const { mail, nom } = req.body;
    const user = await User.findOne({ where: { mail, nom } });

    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });

    const token = generateResetToken(user);
    await sendResetMail({ nom: user.nom, mail: user.mail, token });

    res.status(200).json({ message: "Mail envoyé avec succès" });
};







const updateUser = async (req, res, next) => {
    const userBody = req.body;
    const bodyPassword = req.body.password;
    const emailBody = req.body.email;

    try {
        // Vérification du mot de passe
        if (bodyPassword && bodyPassword.length < 8) {
            req.session.errorMessage = 'Le mot de passe doit contenir au moins 8 caractères.';
            return res.status(200).json({
                message: 'Le mot de passe ne correspond pas aux critères.',
                redirectUrl: `/user/accueil`
            });
        };

        let user = await User.findOne({ email: emailBody });

        if (user) {
            const isValid = await bcrypt.compare(bodyPassword, user.password);
            const validationPassword = { isValid: isValid, message: 'Mot de passe incorrect' }

            // Validation des champs sécurisés
            if (!validationPassword.isValid) {
                req.session.errorMessage = validationPassword.message;
                return res.status(200).json({
                    message: 'Mot de passe incorrect.',
                    redirectUrl: `/user/accueil`
                });
            }
            Object.keys(userBody).forEach((key) => {
                if (!!userBody[key]) {
                    user[key] = userBody[key];
                }
            });

            const userUpdate = await user.save();
            const email = userUpdate.email;
            req.params.email = email;

            req.session.successMessage = `Utilisateur : "${userUpdate.name}" mis à jour avec succès`;
            return res.status(200).json({
                message: 'Profil mis à jour avec succès',
                redirectUrl: `/user/accueil`
            });
        } else {
            req.session.errorMessage = `Utilisateur introuvable avec cet email`;
            return res.status(200).json({
                message: 'Utilisateur introuvable avec cet email',
                redirectUrl: `/user/accueil`
            });
        }
    } catch (error) {
        console.error("adminUpdate : erreur lors de l'utilisation de la méthode", error);
        return res.status(200).json({
            message: 'Utilisateur introuvable avec cet email',
            redirectUrl: `/user/accueil`
        });
    }
};






const deleteUser = async (req, res) => {
    try {
        // ID de l'utilisateur connecté (injecté par checkJWT)
        const connectedUserId = req.user.id_user;

        const user = await User.findOne({ where: { id_user: connectedUserId } });

        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable" });
        }

        await User.destroy({ where: { id_user: connectedUserId } });
        return res.status(200).json({ message: "Compte supprimé avec succès" });
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur", error });
    }
};






module.exports = {
    authenticate: authenticate,
    createUser: createUser,
    passwordUpdate: passwordUpdate,
    newPassword: newPassword,
    requestReset: requestReset,
    getUser: getById,
    deleteUser: deleteUser,
    updateUser: updateUser
};
