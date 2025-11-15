//import { useEffect, useState } from "react";
//import axios from "axios";

import '../styles/desktop/confidentialites.scss';
import '../styles/mobile/confidentialites.scss';

import Layout from "../components/layout";

import img_banner from "../assets/image/heart-lock-4921885_1920.jpg";



const Confidentialites = () => {
    /*
        const [users, setUsers] = useState([""]);
    
        useEffect(() => {
            axios.get('/confidentialites')
                .then(response => {
                    setUsers(response.data);
                })
                .catch(error => {
                    console.error("Erreur lors du chargement des utilisateurs :", error);
                });
        }, []);
    */
    return (
        <Layout>
            <div className="container_gen">
                <h2 className="title">Politique de confidentialitées</h2>

                <div className="confidential_banner">
                    <img src={img_banner} alt="cadenas" />
                </div>


                <div className="container_politique">


                    {/*******/}
                    <div className="box_text">
                        <h4>Introduction</h4>

                        <p className="center">
                            La présente politique de confidentialité a pour objectif d’informer
                            les visiteurs du site lefrontdemer.fr sur la manière dont leurs données
                            personnelles sont collectées, utilisées et protégées. Nous nous
                            engageons à respecter la confidentialité de vos informations
                            conformément au Règlement Général sur la Protection des Données (RGPD).
                        </p>

                    </div>
                    {/*******/}

                    <div className="box_text">
                        <h4>Données collectées</h4>

                        <p className="left">
                            Nous pouvons collecter les données suivantes :
                        </p>

                        <ul>
                            <li>Nom et prénom</li>
                            <li>Adresse e-mail</li>
                            <li>Numéro de téléphone</li>
                            <li>Message envoyé via le formulaire de contact</li>
                            <li>Données de navigation (cookies, adresse IP, type de navigateur)</li>
                        </ul>

                    </div>
                    {/*******/}
                    <div className="box_text">
                        <h4>Finalité de la collecte</h4>

                        <p className="left">Les données sont collectées pour :</p>
                        <ul>
                            <li>Répondre aux demandes via le formulaire de contact</li>
                            <li>Gérer les réservations</li>
                            <li>Améliorer l’expérience utilisateur sur le site</li>
                            <li>Assurer la sécurité du site</li>
                        </ul>


                    </div>
                    {/*******/}

                    <div className="box_text">
                        <h4>Cookies</h4>

                        <p className="left">
                            Notre site utilise des cookies pour :
                        </p>
                        <ul>
                            <li>Analyser la fréquentation du site</li>
                            <li>Faciliter la navigation</li>
                            <li>Mémoriser vos préférences</li>
                        </ul>
                        <p className="left">Vous pouvez à tout moment désactiver les cookies via les paramètres de votre navigateur.</p>

                    </div>
                    {/*******/}
                    <div className="box_text">
                        <h4>Durée de conservation</h4>

                        <p className="center">
                            Les données personnelles sont conservées pendant une durée maximale
                            de 12 mois à compter de la dernière interaction, sauf obligation
                            légale contraire.
                        </p>

                    </div>
                    {/*******/}

                    <div className="box_text">
                        <h4>Partage des données</h4>

                        <p className="left">
                            Les données ne sont jamais vendues ni partagées avec des tiers, sauf si cela est nécessaire pour :
                        </p>

                        <ul>
                            <li>Répondre à une obligation légale</li>
                            <li>Assurer le bon fonctionnement du site (ex. hébergeur, prestataire technique)</li>
                        </ul>

                    </div>
                    {/*******/}
                    <div className="box_text">
                        <h4>Vos droits</h4>

                        <p className="left">
                            Conformément au RGPD, vous disposez des droits suivants :
                        </p>
                        <ul>
                            <li>Droit d’accès à vos données</li>
                            <li>Droit de rectification</li>
                            <li>Droit à l’effacement</li>
                            <li>Droit d’opposition</li>
                            <li>Droit à la portabilité</li>
                        </ul>
                        <p className="left">Pour exercer vos droits, contactez-nous à : lefrontdemer.NoReply@gmail.com</p>

                    </div>
                    {/*******/}

                    <div className="box_text">
                        <h4>Sécurité</h4>

                        <p className="center">
                            Nous mettons en œuvre des mesures techniques et organisationnelles pour
                            protéger vos données contre tout accès non autorisé, perte ou divulgation.
                        </p>

                    </div>
                    {/*******/}
                    <div className="box_text">
                        <h4>Modifications</h4>

                        <p className="center">
                            Cette politique peut être mise à jour à tout moment. La date de la
                            dernière mise à jour est indiquée ci-dessous.
                        </p>
                        <p className="center">
                            Dernière mise à jour : <span className="maj">août 2025</span>
                        </p>

                    </div>
                    {/*******/}



                </div>

            </div>

        </Layout>


    );
};

export default Confidentialites;