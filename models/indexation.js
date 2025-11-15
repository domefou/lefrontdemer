const User = require('./user');
const Reservation = require('./reservation');

// 🔗 Définir les associations ici
User.hasMany(Reservation, { foreignKey: 'id_user', as: 'Reservation' });

Reservation.belongsTo(User, { foreignKey: 'id_user', as: 'User' });



module.exports = {
    User,
    Reservation
};
