//configuration de la base de données avec Sequelize
// Assurez-vous d'avoir installé les dépendances nécessaires : npm install sequelize mysql2 dotenv
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false
  }
);

module.exports = sequelize;
