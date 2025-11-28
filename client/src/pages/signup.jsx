import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../components/layout";

const dotenv = require('dotenv');
dotenv.config();

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

import '../styles/desktop/signup.scss';
import '../styles/mobile/signup.scss';

const SignUp = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");


    // État du formulaire (nom, mail, mot de passe)
    const [formData, setFormData] = useState({
        nom: "",
        mail: "",
        password: ""
    });

    // Gestion des changements dans les inputs
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => setErrorMessage(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    // Gestion de la soumission du formulaire
    const handleSignup = async (e) => {
        e.preventDefault();

        if (formData.password.length < 8) {
            setErrorMessage("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setErrorMessage(""); // Nettoie les erreurs précédentes
                navigate(`${API_URL}/SeConnecter`);
            } else {
                setErrorMessage(data.message || "Erreur lors de l'inscription.");
            }
        } catch (err) {
            console.error('Erreur réseau :', err);
            setErrorMessage("Erreur réseau. Veuillez réessayer.");
        }
    };


    const handleReset = () => {
        setFormData({ mail: "", password: "" });
        setErrorMessage(""); // optionnel : efface aussi les erreurs
    };


    return (
        <Layout>
            <Helmet>
                <title>Inscription - Le Front de Mer</title>
                <meta
                    name="description"
                    content="Créez votre compte sur le site du restaurant Le Front de Mer aux Sables d’Olonne pour réserver en ligne et gérer vos informations personnelles."
                />
            </Helmet>



            {/* Bloc de présentation marketing */}
            <div className="container_paragraphe">
                <div className="paragraphe">
                    <h2>Pourquoi nous rejoindre ?</h2>
                    <p>
                        S’inscrire sur notre site, c’est la garantie d’une expérience simplifiée et personnalisée. <br />
                        En quelques clics, vous pouvez faire une demande de réservation en ligne, recevoir une confirmation rapide, et même enregistrer vos préférences pour vos prochaines visites.<br />
                        Fini les appels ou les attentes : votre table vous attend, et vous gardez le contrôle.<br />

                        De plus, les membres inscrits bénéficient d’un accès prioritaire aux événements spéciaux, aux menus du jour, et à des offres exclusives.<br />
                        C’est notre façon de remercier nos clients fidèles.
                    </p>
                </div>
            </div>

            {/* Formulaire d'inscription */}
            <form onSubmit={handleSignup} onReset={handleReset} id="form_signup">
                <fieldset>
                    <p>Veuillez renseigner tous les champs.</p>
                    <legend>Inscription</legend>

                    {/* Champ nom */}
                    <label htmlFor="signup_name" className="signup_name">Nom :</label>
                    <input
                        type="text"
                        id="signup_name"
                        name="nom"
                        placeholder="Dupond"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                    />

                    {/* Champ email */}
                    <label htmlFor="signup_email" className="signup_email">Adresse mail :</label>
                    <input
                        type="email"
                        id="signup_email"
                        name="mail"
                        placeholder="votreAdresse@mail.com"
                        value={formData.mail}
                        onChange={handleChange}
                        required
                    />

                    {/* Champ mot de passe */}
                    <label htmlFor="current-password" className="current-password">Mot de passe :</label>
                    <input
                        type="password"
                        name="password"
                        id="current-password"
                        placeholder="Votre mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <small>* Le mot de passe doit contenir au moins 8 caractères</small>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    {/* Boutons d'action */}
                    <div className="btn_submit_reset">
                        <input type="submit" value="S'enregistrer" id="btn_submit" />
                        <input type="reset" value="Effacer" id="btn_reset" />
                    </div>
                </fieldset>
            </form>
        </Layout>
    );
};

export default SignUp;
