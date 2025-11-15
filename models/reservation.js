const { DataTypes, DATE } = require('sequelize');
const sequelize = require('../config/sequelize');
const User = require('./user');

const Reservation = sequelize.define('reservation', {
    id_reservation: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    heure: {
        type: DataTypes.TIME,
        allowNull: false
    },
    nbr_couvert: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    etat: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: "en attente"
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'reservation',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Reservation;
