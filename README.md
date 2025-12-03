markdown
# 🍽️ Le Front de Mer - Backend

Backend du projet **Restaurant Le Front de Mer**, développé avec **Node.js / Express** et **Sequelize**.  
Ce serveur gère l’API REST pour l’application frontend, incluant l’authentification, les réservations, la gestion des menus et l’envoi d’emails transactionnels via Brevo.

---

## 🚀 Technologies utilisées

- [Node.js 20.x](https://nodejs.org/) – environnement d’exécution
- [Express](https://expressjs.com/) – framework backend
- [Sequelize](https://sequelize.org/) – ORM pour MySQL/PostgreSQL
- [MySQL2](https://www.npmjs.com/package/mysql2) / [pg](https://www.npmjs.com/package/pg) – connecteurs SQL
- [Brevo](https://www.brevo.com/) – envoi d’emails transactionnels
- [Helmet](https://helmetjs.github.io/) – sécurité HTTP
- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) – protection contre le spam
- [express-session](https://www.npmjs.com/package/express-session) – gestion des sessions
- [bcrypt / bcryptjs](https://www.npmjs.com/package/bcrypt) – hashage des mots de passe
- [Cloudinary](https://cloudinary.com/) – gestion des images
- [dotenv](https://www.npmjs.com/package/dotenv) – gestion des variables d’environnement

---

## 📦 Installation

Clone le projet et installe les dépendances :

```bash
git clone https://github.com/tonrepo/lefrontdemer-backend.git
cd lefrontdemer-backend
npm install
🛠️ Scripts disponibles
npm run dev
Lance le serveur backend avec nodemon et le frontend en parallèle (via concurrently).

npm start
Lance le serveur en mode production.

npm run build
Installe et construit le frontend dans client/build.

🔑 Variables d’environnement
Créer un fichier .env à la racine :

env
NODE_ENV=production
PORT=5000
SECRET_KEY=tonSecretSession
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=motdepasse
DB_NAME=lefrontdemer
BREVO_USER=lefrontdemer.noreply@gmail.com
BREVO_API_KEY=xkeysib-...
FRONTEND_URL=https://lefrontdemerfrontend.onrender.com
REACT_APP_API_URL=https://lefrontdemerbackend.onrender.com

🌐 Routes principales
Public
/accueil – contenu de la page d’accueil

/carte – affichage de la carte du restaurant

/categorie – catégories de plats

/propos – page “À propos”

/confidentialites – politique de confidentialité

/login – connexion utilisateur

/signup – inscription utilisateur

/reset – réinitialisation mot de passe

/logout – déconnexion

Privées (authentifiées)
/auth – vérification de session

/reservation – gestion des réservations

/contact – formulaire de contact

/statusContact – suivi du statut des messages

Admin
/admin/compte – gestion des comptes administrateurs

/admin/menu – gestion des menus

/admin/carte – gestion de la carte

/admin/categorie – gestion des catégories

/admin/propos – gestion de la page “À propos”

/admin/confidentialites – gestion de la politique de confidentialité

Utilisateur
/user/compte – gestion du compte utilisateur

/user/delete – suppression du compte

/user/* – accès aux routes publiques adaptées à l’utilisateur

🔒 Sécurité
Sessions sécurisées avec cookies (secure: true, sameSite: "none")

Protection CORS (origines autorisées : localhost:3000 et Render)

Limitation de requêtes (100 requêtes / 15 min)

Headers sécurisés avec Helmet

📂 Structure du projet
Code
backend/
 ├── routes/
 │   ├── public/          # Routes accessibles sans authentification
 │   ├── private/         # Routes protégées (auth / admin / user)
 │   └── ...
 ├── startup/
 │   └── sequelizeInit.js # Initialisation ORM Sequelize
 ├── server.js            # Point d’entrée du serveur
 ├── package.json
 └── .env
📖 Fonctionnalités principales
🏠 Gestion du contenu public (accueil, carte, catégories, à propos, confidentialité)

👤 Authentification et gestion des comptes utilisateurs/admin

📅 Réservations avec confirmation par email

📩 Formulaire de contact avec suivi du statut

🔐 Sessions sécurisées et gestion des cookies

📤 Envoi d’emails transactionnels via Brevo (reset password, confirmation, statut)

🌐 Déploiement
Le backend est déployé sur Render : 👉 https://lefrontdemerbackend.onrender.com



----------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------


#Utilisation en local



## ⚙️ Intégration du frontend React dans le backend Express

Par défaut, le backend Express du projet **Le Front de Mer** gère uniquement les routes API.  
Pour que le serveur puisse également **servir le frontend React en production**, il faut effectuer quelques manipulations simples dans `server.js`.

---

### 1. Importer `path`
Décommente ou ajoute l’import de `path` en haut du fichier :

```js
const path = require('path');

2. Servir les fichiers statiques du build React
Ajoute cette configuration après tes routes API :

js
// Servir les fichiers statiques React
app.use(express.static(path.join(__dirname, "client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});
👉 Cela permet à Express de renvoyer ton application React pour toutes les routes non gérées par l’API.

3. Construire le frontend avant déploiement
Avant de déployer, assure-toi que le frontend est compilé :

bash
cd client
npm install
npm run build
Le dossier client/build sera généré et contiendra ton application prête pour la production.

4. Vérifier les variables d’environnement
Dans ton .env, assure-toi que les URLs sont correctement définies :

env
PORT=5000
SECRET_KEY=tonSecretSession
FRONTEND_URL=https://lefrontdemerfrontend.onrender.com
REACT_APP_API_URL=https://lefrontdemerbackend.onrender.com
5. Déploiement sur Render
Le backend Express servira automatiquement le contenu du dossier client/build.

Tu n’as plus besoin de déployer séparément le frontend : il est inclus dans le backend.

Les routes API continueront de fonctionner normalement (/accueil, /reservation, etc.), et toutes les autres routes renverront ton application React.

✅ Résultat attendu
En local :

API → http://localhost:5000/api

Frontend → http://localhost:5000

En production (Render) :

API → https://lefrontdemerbackend.onrender.com/...

Frontend → https://lefrontdemerbackend.onrender.com (servi directement par Express)