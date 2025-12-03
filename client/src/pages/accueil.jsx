import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Layout from "../components/layout";
import '../styles/desktop/accueil.scss';
import '../styles/mobile/accueil.scss';
import Intro_banner from "../assets/image/banner_intro.svg";
import img_context from "../assets/image/platting-4282016_1920.jpg";
import img_bar from "../assets/image/glasses-2119604_1280.jpg";


const Accueil = () => {


    return (

        <Layout>
            <Helmet>
                <title>Accueil - Le Front de Mer</title>
                <meta
                    name="description"
                    content="Découvrez le restaurant Le Front de Mer aux Sables d'Olonne, cuisine maison et produits frais."
                />
            </Helmet>

            <div className="container_gen">

                <div className="container_banner">
                    <img src={Intro_banner} alt="terrasse restaurant" />
                </div>

                <div className="container_text_intro">
                    <h1>
                        Le front de mer (Site Factice)
                    </h1>

                    <p className="paragraphe_1">
                        Ce site est un projet fictif réalisé dans le cadre d'une formation en développement web.
                        Toutes les informations, images et contenus présentés ici sont utilisés à des fins éducatives uniquement
                        et ne représentent pas une entreprise réelle.
                    </p>

                    <p className="paragraphe_1">
                        Là où les embruns rencontrent la gourmandise, "Le Front de Mer" vous invite
                        à vivre une expérience culinaire authentique au rythme des vagues et des
                        produits frais. Niché au bord de l’eau, notre établissement célèbre la richesse
                        de la mer à travers une cuisine maison, généreuse et raffinée.
                    </p>

                    <p className="paragraphe_2">
                        Ici, tout est fait maison avec passion, des filets de poisson savamment grillés
                        aux tartares iodés préparés à la minute. Nous travaillons exclusivement avec des
                        ingrédients frais, issus de circuits courts et de pêche responsable.
                    </p>

                    <p className="paragraphe_3">
                        Notre équipe vous accueille dans une ambiance chaleureuse et conviviale,
                        comme à la maison — mais les pieds presque dans l’eau.
                        Venez savourer la mer comme jamais auparavant.
                        Le Front de Mer, c’est le goût de l’océan, servi avec le sourire.
                    </p>
                </div>

                <div className="container_img_context">
                    <img src={img_context} alt="dressage d'assiette gastronomique" />
                </div>

                <div className="container_btn_carte">
                    <Link className="link_carte" to="/Carte">
                        Voir la carte
                    </Link>
                </div>

                <div className="container_text_bar">
                    <h2>Coté bar</h2>


                    <p className="paragraphe_1">
                        Dans une ambiance feutrée où le bois flotté rencontre les lumières tamisées,
                        notre Bar Lounge vous invite à savourer l’instant avec élégance et décontraction.
                        Face à l’océan, bercé par les bruits des vagues et une sélection musicale soignée,
                        profitez d’un moment suspendu autour d’un cocktail raffiné ou d’un verre de vin
                        choisi avec soin.
                    </p>

                    <p className="paragraphe_2">
                        Des créations maison inspirées des saveurs marines et des classiques revisités,
                        élaborées à partir d’ingrédients frais et locaux. Ici, chaque boisson raconte
                        une histoire, et chaque bouchée vous emmène en voyage.
                    </p>

                    <p className="paragraphe_3">
                        Installez-vous confortablement. Que vous veniez pour un apéritif au coucher du soleil,
                        une soirée entre amis, ou un instant de calme, le coin lounge du Front de Mer est
                        votre havre de douceur… au bord de l’eau.
                    </p>

                </div>

                <div className="container_img_bar">
                    <img src={img_bar} alt="terrasse restaurant" />
                </div>



                <div className="horaires_accueil">

                    <div className="container_title">
                        <h2>Jours et horaires d’accueil :</h2>
                    </div>

                    <div className="container_horaire">



                        <div className="horaires_content">

                            <h3>Restaurant ;</h3>

                            <div className="tittle_journée">

                                <div className="content_tittle"></div>
                                <div className="content_tittle">Midi</div>
                                <div className="content_tittle">Soir</div>

                            </div>

                            <div className="horaires_detail">

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

                        <div className="line"></div>

                        {/*************************************************/}

                        <div className="horaires_content">

                            <h3>Lounge bar ;</h3>

                            <div className="tittle_journée">

                                <div className="content_tittle"></div>
                                <div className="content_tittle">Midi</div>
                                <div className="content_tittle">Soir</div>

                            </div>

                            <div className="horaires_detail">



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
                                    <span className="close">Fermé</span>
                                    <span className="close">Fermé</span>
                                    <span className="close">Fermé</span>
                                    <span className="close">Fermé</span>
                                    <span className="close">Fermé</span>
                                    <span className="close">Fermé</span>
                                </div>

                                <div className="horaires_soir">

                                    <span className="close">Fermé</span>
                                    <span className="open">17h00 - 23h00</span>
                                    <span className="open">17h00 - 23h00</span>
                                    <span className="open">17h00 - 23h00</span>
                                    <span className="open">17h00 - 00h30</span>
                                    <span className="open">16h00 - 00h30</span>
                                    <span className="open">16h00 - 22h30</span>


                                </div>

                            </div>


                        </div>




                    </div>

                </div>



            </div>
        </Layout >


    );
};

export default Accueil;