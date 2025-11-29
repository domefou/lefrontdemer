import { Helmet } from "react-helmet-async";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Layout from "../components/layout";


import '../styles/desktop/reservation.scss';
import '../styles/mobile/reservation.scss';

import LogoNav from "../assets/image/logo/logo_resto.svg"; // ✅ Importation de l'image du logo
import Agenda from "../assets/image/agenda.jpg";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Reservation = () => {
    // Récupère l'utilisateur connecté depuis le contexte d'authentification
    const { user } = useContext(AuthContext);

    // État pour gérer le chargement (spinner / bouton désactivé)
    const [loading, setLoading] = useState(false);

    // État pour afficher un message de succès ou d'erreur
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "success" ou "error"

    // État du formulaire (initialisé avec l'id_user si dispo)
    const [formData, setFormData] = useState({
        id_user: user?.id_user || "",
        date: "",
        heure: "",
        nbr_couvert: ""
    });

    // Gestion des changements dans les inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const now = new Date();
        const selectedDate = new Date(formData.date + "T" + formData.heure);

        // Vérifie si la réservation est pour aujourd'hui
        const isToday = selectedDate.toDateString() === now.toDateString();

        // Récupère le jour de la semaine (0 = dimanche, 1 = lundi, etc.)
        const dayOfWeek = selectedDate.getDay();

        // Fermeture le lundi
        if (dayOfWeek === 1) {
            setMessage("Nous sommes fermés le lundi, veuillez choisir une autre disponibilité.");
            setMessageType("error");
            setLoading(false);
            return;
        }

        // Fermeture le dimanche soir
        if (dayOfWeek === 0 && selectedDate.getHours() >= 19) {
            setMessage("Nous sommes fermés le dimanche soir, veuillez choisir une autre disponibilité.");
            setMessageType("error");
            setLoading(false);
            return;
        }

        // Si réservation aujourd'hui, l'heure doit être postérieure à l'heure actuelle
        if (isToday && selectedDate <= now) {
            setMessage("L'heure de réservation doit être ultérieure à l'heure actuelle.");
            setMessageType("error");
            setLoading(false);
            return;
        }

        // Vérifie que l'heure est dans les créneaux autorisés
        const hour = selectedDate.getHours();
        const minutes = selectedDate.getMinutes();
        const totalMinutes = hour * 60 + minutes;

        const midiStart = 12 * 60;       // 12h00
        const midiEnd = 14 * 60 + 30;    // 14h30
        const soirStart = 19 * 60;       // 19h00
        const soirEnd = 22 * 60 + 30;    // 22h30

        const inMidi = totalMinutes >= midiStart && totalMinutes <= midiEnd;
        const inSoir = totalMinutes >= soirStart && totalMinutes <= soirEnd;

        if (!inMidi && !inSoir) {
            setMessage("Les réservations sont possibles uniquement entre 12h-14h30 et 19h-22h30.");
            setMessageType("error");
            setLoading(false);
            return;
        }

        try {
            // Envoi de la requête POST vers ton backend
            const response = await fetch(`${API_URL}/reservation`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: 'include' // ✅ indispensable pour les cookies de session
            });

            if (response.ok) {
                // Succès → message + reset du formulaire
                setMessage("Réservation envoyée avec succès !");
                setMessageType("success");
                setFormData({
                    id_user: user?.id_user || "",
                    date: "",
                    heure: "",
                    nbr_couvert: ""
                });
            } else {
                setMessage("Erreur lors de la soumission.");
                setMessageType("error");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
            setMessage("Erreur réseau.");
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <Helmet>
                <title>Réservations - Le Front de Mer</title>
                <meta
                    name="description"
                    content="Réservez votre table au restaurant Le Front de Mer aux Sables d’Olonne : consultez vos réservations en attente, en cours ou passées et profitez d’une expérience culinaire au bord de l’océan."
                />
            </Helmet>



            <h2 className="title_body">Réserver en ligne</h2>
            <div className="description_reservation">

                <div className="paragraph_1">
                    <p>
                        Effectuez une demande de réservation en ligne grâce a notre simple formulaire
                        et notre équipe mettra tout en œuvre pour répondre a votre demande dans les
                        délais les plus bref.
                    </p>

                </div>
                <div className="paragraph_2">

                    <p>
                        Pour optimiser la disponibilité veuillez réserver au minimum 2h avant la prise de service.
                    </p>

                </div>

                <div className="paragraph_3">
                    <p>
                        A très vite au restaurant <span>Le front de mer</span>.
                    </p>

                </div>

            </div>


            <div className="banner_agenda">
                <img src={Agenda} className="Img_banner" alt="Bannière agenda de réservation" />
            </div>





            <form onSubmit={handleSubmit} className="form_reservation">
                <fieldset>
                    <img src={LogoNav} className="Img_background" alt="Logo le front de mer" />
                    <legend>
                        <h2>Effectuer une demande de réservation</h2>
                    </legend>
                    <div className="content_top">
                        {/* Sélection de la date */}
                        <label htmlFor="date" className="date">Jour de la réservation
                            <input
                                type="date"
                                name="date"
                                id="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                min={new Date().toISOString().split("T")[0]} // empêche les dates passées
                            />
                        </label>

                        {/* Sélection de l'heure */}
                        <label htmlFor="heure" className="heure">Heure de la réservation
                            <select
                                name="heure"
                                id="heure"
                                value={formData.heure}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>Choisir une heure</option>

                                {/* Service du midi */}
                                <optgroup className="midi" label="Midi (12h - 14h)">
                                    {["12:00", "12:15", "12:30", "12:45", "13:00", "13:15", "13:30", "13:45", "14:00"]
                                        .map(h => <option key={h} value={h}>{h}</option>)}
                                </optgroup>

                                {/* Service du soir */}
                                <optgroup className="soir" label="Soir (19h - 22h)">
                                    {["19:00", "19:15", "19:30", "19:45", "20:00", "20:15", "20:30", "20:45", "21:00", "21:15", "21:30", "21:45", "22:00"]
                                        .map(h => <option key={h} value={h}>{h}</option>)}
                                </optgroup>
                            </select>
                        </label>


                        {/* Sélection du nombre de couverts */}
                        <label htmlFor="nbr_couvert" className="nbr_couvert">Nombre de couverts
                            <select
                                name="nbr_couvert"
                                id="nbr_couvert"
                                value={formData.nbr_couvert}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled>nombre de clients</option>
                                {[...Array(8)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </select>
                        </label>

                    </div>


                    {/* Bouton d'envoi */}
                    <button type="submit" className="submit" disabled={loading}>
                        {loading ? "Envoi en cours..." : "Envoyer la demande"}
                    </button>

                    <small>
                        * Pour toute demande de réservation excédant 8 couverts, veuillez contacter l'établissement dans la section contact.
                    </small>




                    {/* Message de retour (succès/erreur) */}
                    <p className={`form_message ${messageType}`}>{message}</p>
                </fieldset>
            </form>




            <div className="horaires_reservations">

                <div className="container_title">
                    <h2>Jours et horaires d’accueil :</h2>
                </div>

                <div className="title_horaires">

                </div>

                <div className="container_horaire">

                    <div className="tittle_journée">

                        <div className="content_tittle"></div>
                        <div className="content_tittle">Midi</div>
                        <div className="none"></div>
                        <div className="content_tittle">Soir</div>

                    </div>

                    <div className="horaires_content">


                        <div className="jour">

                            <span className="open">Lundi :</span>
                            <span className="open">Mardi :</span>
                            <span className="open">Mercredi : </span>
                            <span className="open">Jeudi : </span>
                            <span className="open">Vendredi :</span>
                            <span className="open">Samedi : </span>
                            <span className="open">Dimanche :</span>

                        </div>



                        <div className="horaires_midi">

                            <span className="close">Fermé</span>
                            <span className="open">12h00 - 14h00</span>
                            <span className="open">12h00 - 14h00</span>
                            <span className="open">12h00 - 14h00</span>
                            <span className="open">12h00 - 14h00</span>
                            <span className="open">12h00 - 14h00</span>
                            <span className="open">12h00 - 14h00</span>



                        </div>

                        <div className="line"></div>


                        <div className="horaires_soir">

                            <span className="close">Fermé</span>
                            <span className="open">19h00 - 22h00</span>
                            <span className="open">19h00 - 22h00</span>
                            <span className="open">19h00 - 22h00</span>
                            <span className="open">19h00 - 22h00</span>
                            <span className="open">19h00 - 22h00</span>
                            <span className="close">Fermé</span>


                        </div>

                    </div>




                </div>

            </div>
        </Layout>
    );
};

export default Reservation;
