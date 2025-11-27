import { Helmet } from "react-helmet-async";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // ✅ Import du contexte d'authentification
import Layout from "../components/layout";

import '../styles/desktop/login.scss';
import '../styles/mobile/login.scss';

const Login = () => {
    const navigate = useNavigate();

    // ✅ Récupération de la fonction setUser depuis le contexte
    // Elle permet de stocker l'utilisateur connecté dans l'état global
    const { setUser } = useContext(AuthContext);

    // État pour afficher un message d'erreur (ex: mauvais mot de passe)
    const [errorMessage, setErrorMessage] = useState("");

    // État du formulaire (mail + mot de passe)
    const [formData, setFormData] = useState({
        mail: "",
        password: ""
    });

    // Gestion des changements dans les inputs (mise à jour du state)
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Efface automatiquement le message d'erreur après 5 secondes
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => setErrorMessage(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    // Gestion de la soumission du formulaire
    const handleLogin = async (e) => {
        e.preventDefault();

        // Vérification côté client : mot de passe minimum 8 caractères
        if (formData.password.length < 8) {
            setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        try {
            // Envoi des identifiants au backend
            const response = await fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include' // ✅ inclut les cookies (utile pour JWT/Session)
            });

            const data = await response.json();

            if (response.ok) {
                // Réinitialise le formulaire
                setFormData({ mail: "", password: "" });

                // ✅ Stocke l'utilisateur dans le contexte global
                setUser(data.user);

                // ✅ Redirection selon le rôle de l'utilisateur
                if (data.user.role === 'admin') {
                    navigate('/admin/LeFrontDeMer');
                } else {
                    navigate('/user/LeFrontDeMer');
                }
            } else {
                // Affiche le message d'erreur renvoyé par le backend
                setErrorMessage(data.message);
            }

        } catch (err) {
            // Gestion des erreurs réseau (serveur inaccessible, etc.)
            console.error('Erreur réseau :', err);
            setErrorMessage("Une erreur réseau est survenue. Veuillez réessayer.");
        }

    };


    const handleReset = () => {
        setFormData({ mail: "", password: "" });
        setErrorMessage(""); // optionnel : efface aussi les erreurs
    };


    return (
        <Layout>
            <Helmet>
                <title>Connexion - Le Front de Mer</title>
                <meta
                    name="description"
                    content="Connectez-vous à votre compte sur le site du restaurant Le Front de Mer pour gérer vos réservations et accéder à vos informations personnelles."
                />
            </Helmet>



            <form onSubmit={handleLogin} onReset={handleReset} id="form_login">
                <fieldset>
                    <legend><h2>Connexion</h2></legend>

                    {/* Champ email */}
                    <label htmlFor="email" className="email">Adresse mail :</label>
                    <input
                        type="text"
                        id="email"
                        name="mail"
                        autoComplete="current-mail"
                        placeholder="adresse@mail.com"
                        value={formData.mail}
                        onChange={handleChange}
                        required
                    />

                    {/* Champ mot de passe */}
                    <label htmlFor="password" className="password">Mot de passe :*</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        autoComplete="current-password"
                        placeholder="mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <small>* Le mot de passe doit contenir au moins 8 caractères</small>
                    {/* Affichage du message d'erreur si présent */}

                    {/* Boutons de soumission et reset */}
                    <div className="btn_submit_reset">
                        <input type="submit" id="btn_submit" value="Se connecter" />
                        <input type="reset" id="btn_reset" value="Effacer" />
                    </div>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                </fieldset>


                {/* Lien vers la page de réinitialisation du mot de passe */}
                <a href="/Reset/request" className="link_lost_password">Mot de passe oublié ?</a>
            </form>
        </Layout>
    );
};

export default Login;
