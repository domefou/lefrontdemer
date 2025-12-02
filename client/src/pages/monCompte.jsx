import { Helmet } from "react-helmet-async";
import { useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Layout from "../components/layout";


import '../styles/desktop/monCompte.scss';
import '../styles/mobile/monCompte.scss';

import download from "../assets/image/icons/download.png";


import useReservations from "../Hook/useCompteActions";


const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const MonCompte = () => {
    const { user } = useContext(AuthContext);

    const {
        reservationsEnAttente,
        reservationsFutures,
        reservationsPassees,
        filteredReservations,
        // eslint-disable-next-line no-unused-vars
        //reservationsDuJour,
        reservationsMidi,
        reservationsSoir,
        handleStatusUpdate,
        handleDeleteResa,
        handleDownload,
        activeTab,
        setActiveTab,
        selectedMonth,
        setSelectedMonth,
        visibleCount,
        handleLoadMore,
        //reservations,
        setReservations,
        handleDeleteUser
    } = useReservations();



    // Effet déclenché à chaque fois que l'objet 'user' change
    useEffect(() => {
        // Si aucun utilisateur n'est connecté, on ne fait rien
        if (!user) return;

        // Détermine l'URL de l'API à appeler selon le rôle de l'utilisateur
        const endpoint = user.role === "admin" ? `${API_URL}/admin/compte` : `${API_URL}/user/compte`;

        // Envoie une requête GET à l'API pour récupérer les réservations
        axios.get(endpoint, { withCredentials: true }) // 'withCredentials' permet d'envoyer les cookies
            .then((response) => {
                // Affiche la réponse complète dans la console pour debug
                console.log("Réponse API :", response.data);

                // Met à jour le state 'reservations' avec les données reçues
                // Si 'reservations' est undefined, on utilise un tableau vide par défaut
                setReservations(response.data.reservations || []);
            })
            .catch(error => {
                // Gestion des erreurs de requête
                console.error("Erreur lors du chargement des réservations :", error);

                // Si le serveur a répondu avec une erreur
                if (error.response) {
                    console.error("Réponse du serveur :", error.response.data);
                    console.error("Statut :", error.response.status);
                }
                // Si la requête a été envoyée mais aucune réponse reçue
                else if (error.request) {
                    console.error("Aucune réponse reçue :", error.request);
                }
                // Si l'erreur vient de la configuration de la requête
                else {
                    console.error("Erreur de configuration :", error.message);
                }
            });
    }, [user, setReservations]); // L'effet se déclenche à chaque changement de 'user'










    return (
        <Layout>
            <Helmet>
                <title>Mon compte - Le Front de Mer</title>
                <meta
                    name="description"
                    content="Accédez à votre espace personnel sur Le Front de Mer : consultez vos réservations en attente, en cours ou passées, et gérez votre compte en toute simplicité, y compris la suppression de votre profil."
                />
            </Helmet>



            <h2 className="title_body">Mon compte</h2>


            {/***********************************************************************************************************/}
            {/********************************************** UTILISATEUR ************************************************/}


            {user?.role === "user" && (
                <div className="User_container">

                    <div className="btn_onglet">
                        <button className="btn_en-attente" onClick={() => setActiveTab("attente")}>Réservations en attentes</button>
                        <button className="btn_en-cours" onClick={() => setActiveTab("en-cours")}>Réservations en cours</button>
                        <button className="btn_passees" onClick={() => setActiveTab("passees")}>Réservations passées</button>
                    </div>
                    {/*
container_resa_en-attente
container_resa_en-cours
container_resa_passe
*/}
                    {activeTab === "attente" && (
                        <div className="container_resa_en-attente">

                            <h3>Réservation en attentes</h3>
                            <div className="User_resa_en-attente_head">

                                <p className="User_id-resa" hidden></p>
                                {/*<p className="User_nom-resa">Nom</p>*/}
                                <p className="User_date-resa">Date</p>
                                <p className="User_heure-resa">Heure</p>
                                {/** <p className="User_mail-resa">Mail : {res.User.mail}</p> */}
                                <p className="User_couvert-resa">Couverts</p>
                                <p className="User_etat-resa">Status</p>
                                <p className="User_btn">Actions</p>
                            </div>

                            {reservationsEnAttente.length > 0 ? (
                                reservationsEnAttente.map((res) => (
                                    <div key={res.id_reservation} className="User_resa_en-attente">
                                        <p className="User_id-resa" hidden>{res.id_reservation}</p>
                                        {/*<p className="User_nom-resa">{res.User.nom}</p>*/}
                                        <p className="User_date-resa">{res.date}</p>
                                        <p className="User_heure-resa">{res.heure}</p>
                                        {/** <p className="User_mail-resa">Mail : {res.User.mail}</p> */}
                                        <p className="User_couvert-resa">{res.nbr_couvert}</p>
                                        <p className="User_etat-resa">{res.etat}</p>
                                        <div className="User_resa-actions">
                                            <button className="btn_annuler" onClick={() => handleDeleteResa(res.id_reservation)}>Annuler</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Aucune réservation enregistrée.</p>
                            )}
                        </div>
                    )}


                    {activeTab === "en-cours" && (
                        <div className="container_resa_en-cours">

                            <h3>Réservations en cours</h3>
                            <div className="User_resa_en-cours_head">
                                <p className="User_id-resa" hidden></p>
                                {/**<p className="User_nom-resa">Nom</p>*/}
                                <p className="User_date-resa">Date</p>
                                <p className="User_heure-resa">Heure</p>
                                {/** <p className="User_mail-resa">Mail : {res.User.mail}</p> */}
                                <p className="User_couvert-resa">Couverts</p>
                                <p className="User_etat-resa">Status</p>
                                <p className="User_btn">Actions</p>
                            </div>

                            {reservationsFutures.length > 0 ? (
                                reservationsFutures.map((res) => (
                                    <div key={res.id_reservation} className="User_resa_en-cours">
                                        <p className="User_id-resa" hidden>{res.id_reservation}</p>
                                        {/**<p className="User_nom-resa">{res.User.nom}</p> */}
                                        <p className="User_date-resa">{res.date}</p>
                                        <p className="User_heure-resa">{res.heure}</p>
                                        {/** <p className="User_mail-resa">Mail : {res.User.mail}</p> */}
                                        <p className="User_couvert-resa">{res.nbr_couvert}</p>
                                        <p
                                            className={`User_etat-resa ${res.etat === "acceptée"
                                                ? "etat-acceptée"
                                                : res.etat === "refusée"
                                                    ? "etat-refusée"
                                                    : ""
                                                }`}
                                        >
                                            {res.etat}
                                        </p>

                                        <div className="User_resa-actions">
                                            <button className="btn_annuler" onClick={() => handleDeleteResa(res.id_reservation)}>Annuler</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Aucune réservation enregistrée.</p>
                            )}

                        </div>
                    )}


                    {activeTab === "passees" && (

                        <div className="container_resa_passe">
                            <h3>Réservations passees</h3>
                            <div className="User_resa_passe_head">
                                <p className="User_id-resa" hidden></p>
                                {/** <p className="User_nom-resa">Nom</p> */}
                                <p className="User_date-resa">Date</p>
                                <p className="User_heure-resa">Heure</p>
                                {/** <p className="User_mail-resa">Mail : {res.User.mail}</p> */}
                                <p className="User_couvert-resa">Couverts</p>
                                <p className="User_etat-resa">Status</p>

                            </div>

                            {reservationsPassees.slice(0, visibleCount).map((res) => (
                                <div key={res.id_reservation} className="User_resa_passe">
                                    <p className="User_id-resa" hidden>{res.id_reservation}</p>
                                    { /**<p className="User_nom-resa">{res.User.nom}</p> */}
                                    <p className="User_date-resa">{res.date}</p>
                                    <p className="User_heure-resa">{res.heure}</p>
                                    {/** <p className="User_mail-resa">Mail : {res.User.mail}</p> */}
                                    <p className="User_couvert-resa">{res.nbr_couvert}</p>
                                    <p
                                        className={`User_etat-resa ${res.etat === "acceptée"
                                            ? "etat-acceptée"
                                            : res.etat === "refusée"
                                                ? "etat-refusée"
                                                : ""
                                            }`}
                                    >
                                        {res.etat}
                                    </p>
                                </div>
                            ))}

                            {visibleCount < reservationsPassees.length && (
                                <button onClick={handleLoadMore} className="btn_load-more">
                                    Voir plus
                                </button>
                            )}

                            {reservationsPassees.length === 0 && (
                                <p>Aucune réservation passee.</p>
                            )}
                        </div>






                    )}

                    <div className="deleteUser">
                        <p>Vous souhaitez nous quitter ? Nous en sommes désolé.<br /> Si tel est votre choix nous le respectons, il vous suffit de cliquer sur le boutton ci-dessous afin de supprimer votre compte.</p>
                        <p>Néamoins Attention ! aprés avoir cliqué il ne sera plus possible de faire marche arrière.</p>
                        <button onClick={handleDeleteUser}>Supprimer mon compte</button>
                    </div>

                </div>
            )}





            {/***********************************************************************************************************/}
            {/********************************************** ADMINISTRATEUR *********************************************/}





            {user?.role === "admin" && (
                <div className="Admin_container">

                    <div className="btn_onglet">
                        <button className="btn_en-attente" onClick={() => setActiveTab("attente")}>Réservations en attentes</button>
                        <button className="btn_en-cours" onClick={() => setActiveTab("en-cours")}>Réservations du jour</button>
                        <button className="btn_a-venir" onClick={() => setActiveTab("a-venir")}>Réservations à venir</button>
                        <button className="btn_passees" onClick={() => setActiveTab("passees")}>Réservations passées</button>
                    </div>

                    {/*
container_resa_en-attente
container_resa_du-jour
container_resa_en-cours
container_resa_passe
*/}

                    {activeTab === "attente" && (
                        <div className="container_resa_en-attente">
                            <h3>Réservations en attente</h3>

                            <div className="Admin_resa_en-attente_head">
                                <p className="Admin_id-resa" hidden></p>
                                <p className="Admin_nom-resa">Nom</p>
                                <p className="Admin_date-resa">Date</p>
                                <p className="Admin_heure-resa">Heure</p>
                                {/** <p className="Admin_mail-resa">Mail : {res.User.mail}</p> */}
                                <p className="Admin_couvert-resa">Couverts</p>
                                <p className="Admin_action">Actions</p>

                            </div>


                            {reservationsEnAttente.length > 0 ? (
                                reservationsEnAttente.map((res) => (
                                    <div key={res.id_reservation} className="Admin_resa_en-attente">
                                        <p className="Admin_id-resa" hidden>Id réservation : {res.id_reservation}</p>
                                        <p className="Admin_nom-resa">{res.User.nom}</p>
                                        <p className="Admin_date-resa">{res.date}</p>
                                        <p className="Admin_heure-resa">{res.heure}</p>
                                        {/** <p className="Admin_mail-resa">Mail : {res.User.mail}</p> */}
                                        <p className="Admin_couvert-resa">{res.nbr_couvert}</p>

                                        <div className="Admin_resa-actions">
                                            <button className="btn_accepté" onClick={() => handleStatusUpdate(res, "acceptée")}>V</button>
                                            <button className="btn_refusé" onClick={() => handleStatusUpdate(res, "refusée")}>X</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Aucune réservation enregistrée.</p>
                            )}
                        </div>

                    )}







                    {activeTab === "en-cours" && (


                        <div className="container_resa_du-jour">

                            <div className="container_resa_du-midi">

                                <h3>Réservations du jour (midi)</h3>
                                <div className="Admin_resa_du-midi_head">

                                    <p className="Admin_id-resa" hidden></p>
                                    <p className="Admin_nom-resa">Nom</p>
                                    <p className="Admin_date-resa">Date</p>
                                    <p className="Admin_heure-resa">Heure</p>
                                    {/** <p className="Admin_mail-resa">Mail : {res.User.mail}</p> */}
                                    <p className="Admin_couvert-resa">Couverts</p>
                                    <p className="Admin_etat-resa">Status</p>
                                </div>


                                {reservationsMidi.length > 0 ? (
                                    reservationsMidi.map((res) => (
                                        <div key={res.id_reservation} className="Admin_resa_du-midi">
                                            <p className="Admin_id-resa" hidden>Id réservation : {res.id_reservation}</p>
                                            <p className="Admin_nom-resa">{res.User.nom}</p>
                                            <p className="Admin_date-resa">{res.date}</p>
                                            <p className="Admin_heure-resa">{res.heure}</p>
                                            {/** <p className="Admin_mail-resa">Mail : {res.User.mail}</p> */}
                                            <p className="Admin_couvert-resa">{res.nbr_couvert}</p>
                                            <p
                                                className={`Admin_etat-resa ${res.etat === "acceptée"
                                                    ? "etat-acceptée"
                                                    : res.etat === "refusée"
                                                        ? "etat-refusée"
                                                        : ""
                                                    }`}
                                            >
                                                {res.etat}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p>Aucune réservation pour le midi.</p>
                                )}


                            </div>



                            <div className="container_resa_du-soir">

                                <h3>Réservations du jour (soir)</h3>
                                <div className="Admin_resa_du-soir_head">
                                    <p className="Admin_id-resa" hidden></p>
                                    <p className="Admin_nom-resa">Nom</p>
                                    <p className="Admin_date-resa">Date</p>
                                    <p className="Admin_heure-resa">Heure</p>
                                    {/** <p className="Admin_mail-resa">Mail : {res.User.mail}</p> */}
                                    <p className="Admin_couvert-resa">Couverts</p>
                                    <p className="Admin_etat-resa">Status</p>
                                </div>


                                {reservationsSoir.length > 0 ? (
                                    reservationsSoir.map((res) => (
                                        <div key={res.id_reservation} className="Admin_resa_du-soir">
                                            <p className="Admin_id-resa" hidden>Id réservation : {res.id_reservation}</p>
                                            <p className="Admin_nom-resa">{res.User.nom}</p>
                                            <p className="Admin_date-resa">{res.date}</p>
                                            <p className="Admin_heure-resa">{res.heure}</p>
                                            {/** <p className="Admin_mail-resa">Mail : {res.User.mail}</p> */}
                                            <p className="Admin_couvert-resa">{res.nbr_couvert}</p>
                                            <p
                                                className={`Admin_etat-resa ${res.etat === "acceptée"
                                                    ? "etat-acceptée"
                                                    : res.etat === "refusée"
                                                        ? "etat-refusée"
                                                        : ""
                                                    }`}
                                            >
                                                {res.etat}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p>Aucune réservation pour le soir.</p>
                                )}

                            </div>


                        </div>

                    )}







                    {activeTab === "a-venir" && (



                        <div className="container_resa_en-cours">
                            <h3>Réservations a venir</h3>
                            <div className="Admin_resa_en-cours_head">
                                <p className="Admin_id-resa" hidden></p>
                                <p className="Admin_nom-resa">Nom</p>
                                <p className="Admin_date-resa">Date</p>
                                <p className="Admin_heure-resa">Heure</p>
                                {/** <p className="Admin_mail-resa">Mail : {res.User.mail}</p> */}
                                <p className="Admin_couvert-resa">Couverts</p>
                                <p className="Admin_etat-resa">Status</p>

                            </div>

                            {reservationsFutures.length > 0 ? (
                                reservationsFutures.map((res) => (
                                    <div key={res.id_reservation} className="Admin_resa_en-cours">
                                        <p className="Admin_id-resa" hidden>Id réservation : {res.id_reservation}</p>
                                        <p className="Admin_nom-resa">{res.User.nom}</p>
                                        <p className="Admin_date-resa">{res.date}</p>
                                        <p className="Admin_heure-resa">{res.heure}</p>
                                        {/** <p className="Admin_mail-resa">Mail : {res.User.mail}</p> */}
                                        <p className="Admin_couvert-resa">{res.nbr_couvert}</p>
                                        <p
                                            className={`Admin_etat-resa ${res.etat === "acceptée"
                                                ? "etat-acceptée"
                                                : res.etat === "refusée"
                                                    ? "etat-refusée"
                                                    : ""
                                                }`}
                                        >
                                            {res.etat}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p>Aucune réservation enregistrée.</p>
                            )}

                        </div>

                    )}








                    {activeTab === "passees" && (

                        <div className="container_resa_passe">
                            <h3>Dernières réservations passees ou refusées</h3>

                            {/* Sélecteur de mois */}
                            <div className="filter_month">
                                <label htmlFor="month">Filtrer par mois :</label>
                                <input
                                    type="month"
                                    id="month"
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(e.target.value)}
                                />
                                <button onClick={handleDownload}>
                                    <img className="img_download" src={download} alt="icon telechargement" title="Télécharger le fichier" />
                                </button>
                            </div>

                            {/* En-têtes */}
                            <div className="Admin_resa_passe_head">
                                <p className="Admin_nom-resa">Nom</p>
                                <p className="Admin_date-resa">Date</p>
                                <p className="Admin_heure-resa">Heure</p>
                                <p className="Admin_couvert-resa">Couverts</p>
                                <p className="Admin_etat-resa">Status</p>
                            </div>

                            {/* Liste des réservations */}
                            {filteredReservations.slice(0, visibleCount).map((res) => (
                                <div key={res.id_reservation} className="Admin_resa_passe">
                                    <p className="Admin_nom-resa">{res.User.nom}</p>
                                    <p className="Admin_date-resa">{res.date}</p>
                                    <p className="Admin_heure-resa">{res.heure}</p>
                                    <p className="Admin_couvert-resa">{res.nbr_couvert}</p>
                                    <p
                                        className={`Admin_etat-resa ${res.etat === "acceptée"
                                            ? "etat-acceptée"
                                            : res.etat === "refusée"
                                                ? "etat-refusée"
                                                : ""
                                            }`}
                                    >
                                        {res.etat}
                                    </p>

                                </div>
                            ))}

                            {/* Bouton "Voir plus" */}
                            {visibleCount < filteredReservations.length && (
                                <button onClick={handleLoadMore} className="btn_load-more">
                                    Voir plus
                                </button>
                            )}

                            {/* Message si aucune réservation */}
                            {filteredReservations.length === 0 && (
                                <p>Aucune réservation passee.</p>
                            )}
                        </div>

                    )}

                </div>
            )}


        </Layout>
    );
};

export default MonCompte;
