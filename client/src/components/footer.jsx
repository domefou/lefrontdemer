
import { NavLink } from "react-router-dom";


import '../styles/desktop/footer.scss';
import '../styles/mobile/footer.scss';


import LogoNav from "../assets/image/logo/logo_resto.svg";

import Facebook from "../assets/image/icons/facebook.png"; // ✅ Importation de l'image du logo
import Instagram from "../assets/image/icons/instagram.png";
import Twitter from "../assets/image/icons/twitter.png";




const Footer = () => {


    return (

        <div className="footer">

            <div className="footer_container">

                <div className="contain_onglet">
                    <ul className="footer_onglet-list">
                        <li className="nav-item" >
                            <NavLink className="nav-link" to="/LeFrontDeMer">Accueil </NavLink>
                            <div className="hover_nav"></div>
                        </li>
                        <li className="nav-item" >
                            <NavLink className="nav-link" to="/Carte">Notre carte </NavLink>
                            <div className="hover_nav"></div>
                        </li>
                        <li className="nav-item" >
                            <NavLink className="nav-link" to="/SeConnecter">Mon compte </NavLink>
                            <div className="hover_nav"></div>
                        </li>
                        <li className="nav-item" >
                            <NavLink className="nav-link" to="/Apropos">A propos </NavLink>
                            <div className="hover_nav"></div>
                        </li>
                        <li className="nav-item" >
                            <NavLink className="nav-link" to="/Confidentialites">Confidentialité </NavLink>
                            <div className="hover_nav"></div>
                        </li>
                        <li className="nav-item" >
                            <NavLink className="nav-link" to="/SeConnecter">Contact</NavLink>
                            <div className="hover_nav"></div>
                        </li>

                    </ul>
                </div>

                <div className="contain_info">

                    <div className="info_adresse">

                        <div className="contact">
                            <p className="text_info ">Contact :</p>

                            <div className="text_info_none">
                                <p className="text_none">Le front de mer :</p>
                                <a href="tel:0365849817" className="text_link" >03.65.84.98.17</a>
                            </div>



                        </div>

                        <div className="adresse">
                            <p className="text_info">Adresse :</p>
                            <a className="text_link" target="_blank" rel="noopener noreferrer" href="https://www.google.fr/maps/place/Rte+Bleue,+85100+Les+Sables-d'Olonne/@46.4911302,-1.8077001,17z/data=!3m1!4b1!4m6!3m5!1s0x4804679cdf30678b:0xbd97a5814048ef62!8m2!3d46.4911302!4d-1.8051252!16s%2Fg%2F1tj4gf2v?entry=ttu&g_ep=EgoyMDI1MDgyNC4wIKXMDSoASAFQAw%3D%3D">
                                Rte Bleue, 85100 Les Sables-d'Olonne</a>

                        </div>



                    </div>

                    <div className="info_social">

                        <p className="text_social">Retrouvez nous également sur les réseaux :</p>

                        <div className="social_network">

                            <a target="_blank" rel="noopener noreferrer" href="https://fr-fr.facebook.com/"><img src={Facebook} className="social_link" title="facebook" alt="logo facebook" /></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/"><img src={Instagram} className="social_link" title="instagram" alt="logo instagram" /></a>
                            <a target="_blank" rel="noopener noreferrer" href="https://about.x.com/fr"><img src={Twitter} className="social_link" title="twiter" alt="logo twitter" /></a>

                        </div>

                        <div className="title_container">

                            <div className="footer_title">
                                <h3>Le front de mer </h3>
                                <h4>Restaurant-Bar-Lounge </h4>
                            </div>

                            <div className="footer_logo" >
                                <NavLink to="/LeFrontDeMer" className="footer_img"><img src={LogoNav} className="twitter_link" title="twiter" alt="pinceau decoratif" /></NavLink>
                            </div>

                        </div>

                    </div>



                </div>





            </div>
            <div className="Copyright">
                ©Copyright 2025
            </div>

        </div>

    )

};
export default Footer;