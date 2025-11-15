// Ce script initialise la base de données en exécutant un script SQL
// Assure-toi d'avoir installé les dépendances nécessaires : mysql2, dotenv
// ce script sert a se connecter à la base de données MySQL et exécuter un script SQL pour initialiser la base de données
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config(); // si tu utilises un fichier .env

(async () => {
  try {
    // Connexion à la base de données
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'le_front_de_mer',
      multipleStatements: true // Permet d'exécuter plusieurs requêtes SQL dans un seul appel
    });

    // Lecture du fichier SQL
    const sqlPath = path.join(__dirname, '..', 'database', 'init.sql');

    const sql = fs.readFileSync(sqlPath, 'utf8');

    // Exécution du script SQL
    await connection.query(sql);
    console.log('✅ Script SQL exécuté avec succès !');

    await connection.end();
  } catch (err) {
    console.error('❌ Erreur lors de l’exécution du script SQL :', err.message);
  }
})();
// Pour exécuter ce script, utilise la commande : node scripts/initDB.js
// Assure-toi que le fichier .env est configuré avec les bonnes informations de connexion à la base de données.
