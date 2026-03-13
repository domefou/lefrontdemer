// Ce script initialise la base de données en exécutant un script SQL
// dépendances nécessaires : mysql2, dotenv
// ce script sert a se connecter à la base de données MySQL et exécuter un script SQL pour initialiser la base de données
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

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
    const files = ['schema.sql', 'data.sql'];// Liste des fichiers SQL à exécuter dans l'ordre

    for (const file of files) {
      const sqlPath = path.join(__dirname, file);// Assurez-vous que les fichiers SQL sont dans le même répertoire que ce script
      const sql = fs.readFileSync(sqlPath, 'utf8');// Lecture du contenu du fichier SQL

      await connection.query(sql);
    }
    console.log('✅ Script SQL exécuté avec succès !');

    await connection.end();
  } catch (err) {
    console.error('❌ Erreur lors de l’exécution du script SQL :', err.message);
  }
})();
