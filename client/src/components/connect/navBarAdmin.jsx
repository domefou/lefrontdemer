
import { NavLink } from "react-router-dom";
import LogoNav from "../../assets/image/logo/logo_resto.svg"; // ✅ Importation de l'image du logo
import Vector from "../../assets/image/Frame_desktop.png";

import LogoutButton from "../logout";

import '../../styles/desktop/navBar.scss';
import '../../styles/mobile/navBar.scss';

const NavBarAdmin = () => {


    return (
        <div className="NavBarContainer">


            {/* Connexion / Inscription */}

            <img src={Vector} className="vector1" alt="pinceau decoratif" />
            <img src={Vector} className="vector2" alt="pinceau decoratif" />
            <img src={Vector} className="vector3" alt="pinceau decoratif" />
            <img src={Vector} className="vector4" alt="pinceau decoratif" />


            <div className="container_top">
                {/* Logo */}

                <div className="container_left">
                    <div className="container-img" >
                        <NavLink className="navbar-brand" to="/admin/LeFrontDeMer">
                            <img src={LogoNav} className="ImgNavBar" title="Accueil" alt="Logo le front de mer" />
                        </NavLink>
                    </div>
                    <div className="container_title">
                        <h1>
                            Le front de mer
                        </h1>
                        <h2>Restaurant-Bar-Lounge</h2>
                    </div>
                </div>

                <div className="container_identification">
                    <LogoutButton />
                </div>
            </div>

            <nav className="navbar navbar-expand-md navbar-light">

                <div className="container-fluid container-navbar">


                    {/* Burger button */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Menu */}
                    <div className="collapse navbar-collapse onglet-container" id="navbarNav">
                        <ul className="navbar-nav me-auto onglet-list">
                            <li className="nav-item" >
                                <NavLink className="nav-link" to="/admin/LeFrontDeMer">Accueil</NavLink>
                                <div className="hover_nav"></div>
                            </li>
                            <li className="nav-item" >
                                <NavLink className="nav-link" to="/admin/Carte">Notre carte</NavLink>
                                <div className="hover_nav"></div>
                            </li>
                            <li className="nav-item" >
                                <NavLink className="nav-link" to="/admin/Compte">Mon compte</NavLink>
                                <div className="hover_nav"></div>
                            </li>
                            <li className="nav-item" >
                                <NavLink className="nav-link" to="/admin/Apropos">A propos</NavLink>
                                <div className="hover_nav"></div>
                            </li>
                            <li className="nav-item" >
                                <NavLink className="nav-link" to="/admin/Confidentialites">Confidentialité</NavLink>
                                <div className="hover_nav"></div>
                            </li>
                            <li className="nav-item" >
                                <NavLink className="nav-link" to="/admin/Contact">Contact</NavLink>
                                <div className="hover_nav"></div>
                            </li>

                        </ul>


                    </div>
                </div>
            </nav>
            <div className="container_reservation" >
                <NavLink className="reservation" to="/admin/Reservation">Réserver en ligne</NavLink>
            </div>

        </div>



    );

};

export default NavBarAdmin;
