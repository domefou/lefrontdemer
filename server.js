const express = require('express');
const cors = require('cors');
//const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');








require('dotenv').config();
require('./startup/sequelizeInit'); // initialise Sequelize + synchronisation

const app = express();
app.use(express.urlencoded({ extended: true }));


app.set('trust proxy', 1);

// Sécurité & performance
const allowedOrigins = [
  "https://lefrontdemerfrontend.onrender.com",
  "http://localhost:3000"
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());
app.use(cookieParser());

// Routes API
const accueilRoutes = require('./routes/public/accueil');
const carteRoutes = require('./routes/public/carte');
const categorieRoutes = require('./routes/public/categorie');
const proposRoutes = require('./routes/public/aPropos');
const confidentialitesRoutes = require('./routes/public/confidentialites');


const authRoutes = require('./routes/private/authCheck');
const reservationRoutes = require('./routes/private/reservation');

const adminCompte = require('./routes/private/admin/compte');
const adminMenu = require('./routes/private/admin/menu');
const adminCarte = require('./routes/private/admin/carte');

const userCompte = require('./routes/private/user/compte');
const userDelete = require('./routes/private/user/delete');


const contactRoutes = require('./routes/private/contact')
const contactStatusRoutes = require('./routes/private/statusContact')




const logout = require('./routes/public/logout');
const resetRoutes = require('./routes/public/reset');
const login = require('./routes/public/login');
const signup = require('./routes/public/signup');

//app.use('/admin', adminCompte, adminMaintenance);
//app.use('/user', userCompte);


app.use('/accueil', accueilRoutes);
app.use('/carte', carteRoutes);
app.use('/categorie', categorieRoutes);
app.use('/propos', proposRoutes);
app.use('/confidentialites', confidentialitesRoutes);

app.use('/reset', resetRoutes);
app.use('/logout', logout);
app.use('/login', login);
app.use('/signup', signup);


app.use('/auth', authRoutes)
app.use('/reservation', reservationRoutes)


app.use('/admin/compte', adminCompte);
app.use('/admin/menu', adminMenu);
app.use('/admin/accueil', accueilRoutes);
app.use('/admin/carte', adminCarte);
app.use('/admin/categorie', categorieRoutes);
app.use('/admin/propos', proposRoutes);
app.use('/admin/confidentialites', confidentialitesRoutes);




app.use('/user/compte', userCompte);
app.use('/user/delete', userDelete);
app.use('/user/accueil', accueilRoutes);
app.use('/user/carte', carteRoutes);
app.use('/user/categorie', categorieRoutes);
app.use('/user/propos', proposRoutes);
app.use('/user/confidentialites', confidentialitesRoutes);



app.use('/contact', contactRoutes);
app.use('/statusContact', contactStatusRoutes);


//////////// Cette partie doit etre commenter pour le déploiement  utilisation uniquement en local ////////////

// Fichiers statiques React

/*
app.use(express.static(path.join(__dirname, "client/build")));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////


// Middleware d’erreur
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});

