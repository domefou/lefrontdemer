import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout";


import '../styles/desktop/newPassword.scss';
import '../styles/mobile/newPassword.scss';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const ResetConfirm = () => {
    const { token, mail } = useParams(); // récupère le token depuis l'URL
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirm) {
            setErrorMessage("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/reset/confirm/${token}/${encodeURIComponent(mail)}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password })
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("Mot de passe mis à jour avec succès !");
                setTimeout(() => navigate(`${API_URL}/SeConnecter`), 3000); // redirection après 3s
            } else {
                setErrorMessage(data.message || "Erreur lors de la mise à jour.");
            }
        } catch (err) {
            setErrorMessage("Erreur réseau. Veuillez réessayer.");
        }

    };

    return (
        <Layout>
            <Helmet>
                <title>Nouveau mot de passe - Le Front de Mer</title>
                <meta
                    name="description"
                    content="Enregistrez un nouveau mot de passe pour sécuriser votre compte sur le site du restaurant Le Front de Mer."
                />
            </Helmet>



            <div className="container_new">
                <h2>Réinitialisation du mot de passe</h2>
                <form onSubmit={handleSubmit} id="form_new_password">
                    <fieldset>
                        <legend></legend>

                        <label htmlFor="password" className="password">Nouveau mot de passe :</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <label htmlFor="confirm" className="confirm">Confirmer le mot de passe :</label>
                        <input
                            type="password"
                            id="confirm"
                            name="confirm"
                            autoComplete="new-password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                        />

                        {errorMessage && <p className="error">{errorMessage}</p>}
                        {successMessage && <p className="success">{successMessage}</p>}

                        <div className="btn_submit_reset">
                            <input type="submit" value="Valider" id="btn_submit" />
                            <input type="reset" value="Effacer" id="btn_reset" onClick={() => {
                                setPassword("");
                                setConfirm("");
                                setErrorMessage("");
                            }} />
                        </div>
                    </fieldset>
                </form>
            </div>
        </Layout>
    );
};

export default ResetConfirm;
