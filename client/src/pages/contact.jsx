import { Helmet } from "react-helmet-async";
import { useState, useEffect } from "react";


import "../styles/desktop/contact.scss";
import "../styles/mobile/contact.scss";

import Layout from "../components/layout";

import LogoNav from "../assets/image/logo/logo_resto.svg";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Contact = () => {

    // const { user } = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    // État du formulaire (nom,objet,mail,message)
    const [formData, setFormData] = useState({
        nom: "",
        objet: "",
        mail: "",
        message: ""
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

    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => setSuccessMessage(""), 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);



    const handleContact = async (e) => {
        e.preventDefault();

        if (!formData.nom || !formData.objet || !formData.mail || !formData.message) {
            setErrorMessage("Tous les champs sont requis.");
            return;
        }

        try {
            // Envoi des identifiants au backend
            const response = await fetch(`${API_URL}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include' // ✅ inclut les cookies (utile pour JWT/Session)
            });

            const contentType = response.headers.get("content-type");

            if (contentType && contentType.includes("application/json")) {
                const data = await response.json();
                // suite logique
                if (response.ok) {
                    // Réinitialise le formulaire
                    setFormData({ nom: "", objet: "", mail: "", message: "" });
                    setSuccessMessage("Votre message a bien été envoyé !");
                    setTimeout(() => setSuccessMessage(""), 5000);

                } else {
                    // Affiche le message d'erreur renvoyé par le backend
                    setErrorMessage(data.message);
                }
            } else {
                setErrorMessage("Réponse inattendue du serveur.");
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
                <title>Contact - Le Front de Mer</title>
                <meta
                    name="description"
                    content="Contactez le restaurant Le Front de Mer aux Sables d’Olonne : adresse, téléphone et réservation en ligne."
                />
            </Helmet>


            <div className="container_contact">

                <div className="contact">
                    <h2>Contact</h2>
                    <p className="center">Envie de réserver une table face à l’océan ou de siroter un cocktail au soleil couchant ?
                        Parlons-nous ! Nous sommes ravis de vous accueillir avec le sourire et des produits
                        frais… même avant votre arrivée.</p>
                </div>

                <div className="adresse">
                    <h3>Notre adresse</h3>
                    <p className="center">Le Front de Mer :
                        Rte Bleue  85100 Les Sables-d’Olonne .</p>
                    <p className="center">Situé en bordure de plage, avec vue sur l’horizon et les bateaux au loin. Parking à proximité.</p>
                </div>


                <div className="coordonnees">
                    <h3>Nous contacter</h3>
                    <ul>
                        <li><span className="bold">Téléphone : </span>02 51 XX XX XX </li>
                        <li><span className="bold">E-mail : </span>lefrontdemer.NoReply@gmail.com</li>
                        <li><span className="bold">Instagram / Facebook : </span> @lefrontdemer.restaurant</li>
                    </ul>

                    <p className="left">Réponse garantie sous 24h pour les demandes de réservation et événements privés.</p>


                </div>

                <div className="contact_form">
                    <h3>Formulaire de contact</h3>
                    <form action="" onSubmit={handleContact}>
                        <fieldset>
                            <label htmlFor="nom">Nom :</label>
                            <input
                                type="text"
                                name="nom"
                                id="nom"
                                placeholder="Dupond"
                                value={formData.nom}
                                onChange={handleChange}
                                required />



                            <label htmlFor="objet">Objet :</label>
                            <input
                                type="text"
                                name="objet"
                                id="objet"
                                placeholder="Objet du message"
                                value={formData.objet}
                                onChange={handleChange}
                                required />




                            <label htmlFor="mail">Email :</label>
                            <input
                                type="text"
                                name="mail"
                                id="mail"
                                placeholder="adresse@mail.com"
                                value={formData.mail}
                                onChange={handleChange}
                                required />



                            <label htmlFor="message">Message :</label>
                            <textarea
                                id="message"
                                name="message"
                                placeholder="Votre message"
                                rows="3"
                                cols="50"
                                maxLength="250"
                                style={{ resize: 'none', overflowWrap: 'break-word' }}
                                value={formData.message}
                                onChange={handleChange}
                                required>

                            </textarea>



                            <div className="btn_submit_reset">
                                <input type="submit" id="btn_submit" value="Envoyer" />
                                <input type="reset" id="btn_reset" value="Effacer" />
                            </div>
                        </fieldset>
                    </form>
                    {errorMessage && <p className="error">{errorMessage}</p>}
                    {successMessage && <p className="success">{successMessage}</p>}
                </div>


                <div className="contact_horaire">
                    <h3>Horaires d’ouverture</h3>
                    <div className="box_container">
                        <div className="horaire">
                            <div className="horaire_top">
                                <ul><span className="bold">Restaurant :</span>
                                    <li><span className="bold">Mardi → Dimanche :</span> 12h00 - 14h30 / 19h00 - 21h30</li>
                                </ul>
                                <p className="red">Fermeture le lundi</p>
                            </div>

                            <div className="horaire_bottom">

                                <ul><span className="bold">Bar Lounge :</span>
                                    <li><span className="bold">Mardi → Jeudi :</span> 17h00 - 23h30</li>
                                    <li><span className="bold">Vendredi & Samedi :</span> 16h00 - 00h30</li>
                                    <li><span className="bold">Dimanche :</span> 16h00 - 22h30</li>
                                </ul>

                                <p className="red">Fermeture le lundi</p>
                            </div>
                        </div>

                        <div className="logo">
                            <img src={LogoNav} className="Img_background" alt="Logo le front de mer" />
                        </div>
                    </div>
                </div>




                <div className="small">
                    <small>Que ce soit pour une réservation romantique, un dîner d'affaires
                        ou un apéro sur notre terrasse marine… chaque message compte.
                        À très vite sur la Rte Bleue !
                    </small>
                </div>




            </div>

        </Layout>


    );
};

export default Contact;