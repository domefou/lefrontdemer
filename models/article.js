const { DataTypes, DATE } = require('sequelize');
const sequelize = require('../config/sequelize');

const Article = sequelize.define('article', {
    id_article: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_categorie: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    prix: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    detail: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    photo1: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: 'https://res.cloudinary.com/dtai1ysvg/image/upload/v1758209638/pas_de_photo_b1maka.png'
    },
    photo2: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: 'https://res.cloudinary.com/dtai1ysvg/image/upload/v1758209638/pas_de_photo_b1maka.png'
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
    tableName: 'article',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Article;
