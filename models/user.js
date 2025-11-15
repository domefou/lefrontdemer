const { DataTypes, DATE } = require('sequelize');
const sequelize = require('../config/sequelize');
const Reservation = require('./reservation'); // ← chemin relatif vers ton modèle



const User = sequelize.define('user', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    telephone: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'user'
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
},

    {
        tableName: 'user',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'

    }
);

module.exports = User;
