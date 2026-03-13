const User = require('./user');
const Reservation = require('./reservation');
const Article = require('./article');
const Categorie = require('./categorie');

// associations entre les tables
User.hasMany(Reservation, { foreignKey: 'id_user', as: 'Reservation' });

Reservation.belongsTo(User, { foreignKey: 'id_user', as: 'User' });

Categorie.hasMany(Article, { foreignKey: 'id_categorie', as: 'Article' });

Article.belongsTo(Categorie, { foreignKey: 'id_categorie', as: 'Categorie' });


module.exports = {
    User,
    Reservation,
    Article,
    Categorie
};
