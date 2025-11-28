//configuration de la base de données avec Sequelize
// Assurez-vous d'avoir installé les dépendances nécessaires : npm install sequelize mysql2 dotenv
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,        // railway
  process.env.DB_USER,        // root
  process.env.DB_PASSWORD,    // ton mot de passe
  {
    host: process.env.DB_HOST,   // interchange.proxy.rlwy.net
    port: process.env.DB_PORT,   // 16992
    dialect: 'mysql',
    logging: false
  }
);

module.exports = sequelize;
