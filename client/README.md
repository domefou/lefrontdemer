# 🍽️ Le Front de Mer - Frontend

Frontend du projet **Restaurant Le Front de Mer**, développé avec **React** et **Bootstrap**.  
Ce projet permet aux utilisateurs de consulter la carte, réserver une table, gérer leur compte et interagir avec l’équipe du restaurant via une interface moderne et responsive.

---

## 🚀 Technologies utilisées

- [React 18](https://react.dev/) – bibliothèque principale
- [React Router DOM](https://reactrouter.com/) – gestion des routes
- [Bootstrap 5](https://getbootstrap.com/) & [React-Bootstrap](https://react-bootstrap.github.io/) – design et composants UI
- [Axios](https://axios-http.com/) – requêtes HTTP vers l’API backend
- [React Helmet Async](https://github.com/staylor/react-helmet-async) – gestion des balises `<head>` (SEO)
- [Sass](https://sass-lang.com/) – préprocesseur CSS
- Outils de tests : `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`

---

## 📦 Installation

Clone le projet et installe les dépendances :

```bash
git clone https://github.com/tonrepo/lefrontdemer-frontend.git
cd lefrontdemer-frontend
npm install



🛠️ Scripts disponibles
Dans le répertoire du projet, tu peux exécuter :

npm start
Lance l’application en mode développement. 👉 Accessible sur http://localhost:3000.

npm run build
Construit l’application pour la production dans le dossier build. Le build est minifié et optimisé pour de meilleures performances.

npm test
Lance les tests en mode interactif.

npm run eject
⚠️ Opération irréversible. Copie toute la configuration (Webpack, Babel, ESLint) dans ton projet.

🔗 Proxy vers le backend
Le frontend est configuré pour communiquer avec le backend via un proxy :

json
"proxy": "http://localhost:5000"
En production, l’API est déployée sur : https://lefrontdemerbackend.onrender.com

🌐 Déploiement
Le frontend est déployé sur Render : 👉 https://lefrontdemerfrontend.onrender.com

Pour déployer :

Construis le projet avec npm run build.

Configure Render pour servir les fichiers statiques du dossier build.

🔒 Sécurité & sessions
Les requêtes sont protégées par CORS (origines autorisées : localhost:3000 et Render).

Les cookies de session sont configurés avec :

secure: true (HTTPS obligatoire)

sameSite: "none" (nécessaire pour cross-site)

📂 Structure du projet
Code
client/
 ├── public/              # Fichiers statiques
 ├── src/
 │   ├── components/       # Composants React
 │   ├── pages/            # Pages principales (Accueil, Carte, Réservation, etc.)
 │   ├── services/         # Appels API via Axios
 │   ├── styles/           # Fichiers Sass
 │   └── App.js            # Point d’entrée React
 ├── package.json
 └── README.md
👨‍💻 Développement
Node.js requis : 20.x

Lancer le backend sur localhost:5000 pour tester les appels API.

Frontend accessible sur localhost:3000.

📖 Fonctionnalités principales
🏠 Page d’accueil avec présentation du restaurant

📜 Consultation de la carte et des catégories

📅 Réservation en ligne avec confirmation par email

👤 Gestion des comptes utilisateurs et administrateurs

📩 Formulaire de contact avec suivi du statut

🔐 Authentification et gestion des sessions sécurisées