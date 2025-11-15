const { DataTypes, DATE } = require('sequelize');
const sequelize = require('../config/sequelize');

const Menu = sequelize.define('menu', {
    id_menu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    prix: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    entree: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    plat: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    dessert: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    boisson: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    photo1: {
        type: DataTypes.TEXT,
        allowNull: true
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
    tableName: 'menu',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Menu;
