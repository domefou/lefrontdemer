import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/layout";


import '../styles/desktop/resetPassword.scss';
import '../styles/mobile/resetPassword.scss';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const ResetPassword = () => {

    const [formData, setFormData] = useState({ mail: "", nom: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleResetPassword = async (e) => {
        e.preventDefault();


        try {
            // Envoi des identifiants au backend
            const response = await fetch(`${API_URL}/reset/request`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                // Réinitialise le formulaire
                setFormData({ mail: "", nom: "" });

                navigate(`${API_URL}/LeFrontDeMer`);

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

    return (
        <Layout>
            <Helmet>
                <title>Réinitialiser le mot de passe - Le Front de Mer</title>
                <meta
                    name="description"
                    content="Demandez la réinitialisation de votre mot de passe sur Le Front de Mer : recevez un lien sécurisé par email pour définir un nouveau mot de passe."
                />
            </Helmet>


            <div className="container_reset">
                <h2>Reinitialiser le mot de passe</h2>
                <form onSubmit={handleResetPassword} id="form_reset">
                    <fieldset>

                        {/* Champ email */}
                        <label htmlFor="email" className="email">Adresse mail :</label>
                        <input
                            type="text"
                            id="email"
                            name="mail"
                            placeholder="adresse@mail.com"
                            value={formData.mail}
                            onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
                            required
                        />

                        {/* Champ mot de passe */}
                        <label htmlFor="nom" className="nom">Votre Nom</label>
                        <input
                            type="text"
                            id="nom"
                            name="nom"
                            placeholder="Dupond"
                            value={formData.nom}
                            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                            required
                        />


                        <small>* Un mail de reinitialisation du mot de passe va vous etre envoyé a cette adresse mail.</small>
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        {/* Boutons de soumission et reset */}
                        <div className="btn_submit_reset">
                            <input type="submit" id="btn_submit" value="Recevoir un lien" />
                            <input type="reset" id="btn_reset" value="Effacer" />
                        </div>
                    </fieldset>
                </form>


            </div>
        </Layout>
    )
}

export default ResetPassword;



