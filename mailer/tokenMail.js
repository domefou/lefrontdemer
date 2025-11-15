const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const generateResetToken = (user) => {
    return jwt.sign(
        { id_user: user.id_user, mail: user.mail, nom: user.nom },
        process.env.SECRET_KEY,
        { expiresIn: '15m' }
    );
};

module.exports = { generateResetToken };
