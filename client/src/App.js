import Accueil from "./pages/accueil";
import Propos from "./pages/aPropos";
import Carte from "./pages/carte";
import Confidentialites from "./pages/confidentialites";
import Contact from "./pages/contact";
import Login from "./pages/login";
import ResetPassword from "./pages/resetPassword";
import ResetConfirm from "./pages/newPassword";
import Reservation from "./pages/reservation";


import MonCompte from "./pages/monCompte";

import SignUp from "./pages/signup";



import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import './styles/app.scss';

import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
// ✅ Importation du fichier CSS pour le style global

// Importation du hook useEffect pour gérer les effets de bord,
// et useLocation pour détecter les changements de route dans React Router.
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Définition du composant ScrollToTop
function ScrollToTop() {
  // Récupération du chemin actuel de la route (pathname)
  // Cela permet de détecter quand l'utilisateur navigue vers une nouvelle page.
  const { pathname } = useLocation();

  // Effet déclenché à chaque changement de route
  useEffect(() => {
    // Utilisation d'un délai pour laisser le temps au DOM de se stabiliser
    // avant d'effectuer le scroll. Cela évite les "sauts" visuels.
    const timeout = setTimeout(() => {
      // Scroll vers le haut de la page. Le comportement peut être "auto" (instantané)
      // ou "smooth" (défilement fluide), selon l'effet désiré.
      window.scrollTo({ top: 0, behavior: "auto" }); // ou "smooth"
    }, 50); // Délai en millisecondes, ajustable selon les besoins

    // Nettoyage du timeout si le composant est démonté ou si pathname change à nouveau
    return () => clearTimeout(timeout);
  }, [pathname]); // L'effet se déclenche uniquement quand le chemin change

  // Ce composant ne rend rien à l'écran, il agit uniquement en arrière-plan
  return null;
}




const App = () => {
  return (
    <div className="BodyContainer">
      <ScrollToTop />
      <Routes>
        <Route path="*" element={<Navigate to="/LeFrontDeMer" />} />
        <Route path="/" element={<Navigate to="/LeFrontDeMer" />} />

        {/* Routes publiques */}
        <Route path="/LeFrontDeMer" element={<Accueil />} />
        <Route path="/Apropos" element={<Propos />} />
        <Route path="/Carte" element={<Carte />} />
        <Route path="/Confidentialites" element={<Confidentialites />} />
        <Route path="/Reset/request" element={<ResetPassword />} />
        <Route path="/Reset/confirm/:token/:mail" element={<ResetConfirm />} />


        {/* Routes utilisateur */}
        <Route path="/user/LeFrontDeMer" element={<Accueil />} />
        <Route path="/user/Apropos" element={<Propos />} />
        <Route path="/user/Carte" element={<Carte />} />
        <Route path="/user/Confidentialites" element={<Confidentialites />} />
        <Route path="/user/Contact" element={<Contact />} />
        <Route path="/user/Compte" element={<MonCompte />} />
        <Route path="/user/Reservation" element={<Reservation />} />

        {/* Routes admin */}
        <Route path="/admin/LeFrontDeMer" element={<Accueil />} />
        <Route path="/admin/Apropos" element={<Propos />} />
        <Route path="/admin/Carte" element={<Carte />} />
        <Route path="/admin/Confidentialites" element={<Confidentialites />} />
        <Route path="/admin/Contact" element={<Contact />} />
        <Route path="/admin/Compte" element={<MonCompte />} />
        <Route path="/admin/Reservation" element={<Reservation />} />

        {/* Auth */}
        <Route path="/SeConnecter" element={<Login />} />
        <Route path="/Sinscrire" element={<SignUp />} />
      </Routes>
    </div>
  );
};
export default App;
