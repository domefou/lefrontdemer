import { useState, useContext } from 'react';
import { AuthContext } from "../context/AuthContext.js";


import {
    handleAddMenu,
    handleEditClick,
    handleDeleteClick,
    handleMenu
} from '../Hook/useMenuActions.js';




import flower from "../assets/image/flower-2293332_1920.png";
import arabesque from "../assets/image/floral-1751088_1920.png";
import update_png from "../assets/image/icons/update.png";
import delete_png from "../assets/image/icons/delete.png";

import close_png from "../assets/image/icons/close.png";
import add_png from "../assets/image/icons/add.png";





function Menu({ menus }) {

    const { user } = useContext(AuthContext);
    // eslint-disable-next-line no-unused-vars
    const [menusState, setMenusState] = useState([""]);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [formAction, setFormAction] = useState("PUT");
    const [errorMessage, setErrorMessage] = useState("");

    // Vérification que menus est un tableau
    if (!Array.isArray(menus)) {
        console.warn("menus n'est pas un tableau :", menus);
        return <p className="text-center">Aucune donnée reçue</p>;
    }

    // Filtrer les menus valides
    const menusValides = menus.filter(menu => menu && typeof menu === 'object' && menu.nom);




    const onEditClick = handleEditClick(setFormAction, setSelectedMenu);

    const onDeleteClick = handleDeleteClick(setFormAction, setSelectedMenu);

    const onHandleMenu = (e) => handleMenu({
        e,
        selectedMenu,
        formAction,
        setMenusState,
        setSelectedMenu,
        setErrorMessage,
    });


    const handleCloseForm = () => {
        setSelectedMenu(null); // Cela cache le formulaire
    };





    return (
        <div className='mise_en_page'>


            <div className="row row-cols-1 container_menu">



                {menusValides.length > 0 ? (
                    menusValides.map((menu, index) => (
                        <div className="container_content" key={index}>
                            <img className='flower' src={flower} alt="fleur decoratif" />
                            <img className='arabesque' src={arabesque} alt="arabesque decoratif" />

                            <h3>Menu du jour</h3>
                            <div className="menu_top">
                                <h4>{menu.nom}</h4>
                            </div>
                            <div className="menu_down">
                                {menu.photo1 && (
                                    <img
                                        className="menu_image"
                                        src={menu.photo1}
                                        alt={menu.nom}
                                        loading="lazy"
                                    />
                                )}
                                <div className="menu_detail"><p className="text">{menu.entree || "Aucun détail"}</p></div>
                                <div className="border"></div>
                                <div className="menu_detail"><p className="text">{menu.plat || "Aucun détail"}</p></div>
                                <div className="border"></div>
                                <div className="menu_detail"><p className="text">{menu.dessert || "Aucun détail"}</p></div>
                                <div className="border"></div>
                                <div className="menu_detail"><p className="text">{menu.boisson || "Aucun détail"}</p></div>
                                <div className="menu_prix">
                                    <p className="text">Prix TTC :</p>
                                    <p className="text">{menu.prix} €</p>
                                </div>

                                {user && user.role === "admin" && (
                                    <div className='btn_modificate'>
                                        <button className="btn_update" onClick={() => onEditClick(menu)}>
                                            <img src={update_png} alt="modifier contenu" />
                                        </button>
                                        <button
                                            className="btn_delete"
                                            onClick={() => {
                                                if (window.confirm("Voulez-vous vraiment supprimer ce menu ?")) {
                                                    onDeleteClick(menu);
                                                }
                                            }}
                                        >
                                            <img src={delete_png} alt="supprimer contenu" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    user && user.role === "admin" ? (
                        <div className='menuNone'>
                            <p className="text-center">Aucun menu disponible</p>
                            <button
                                className="btn_add"
                                onClick={() => handleAddMenu(setFormAction, setSelectedMenu)}
                            >
                                <img src={add_png} alt="ajouter un dessert" />
                            </button>
                        </div>
                    ) : (
                        <p className="text-center">Nous ne disposons pas d'un menu du jour aujourd'hui</p>
                    )
                )}



            </div>
            {selectedMenu && (


                <div className='container_form'>

                    <form onSubmit={onHandleMenu} className='form_menu_du_jour'>

                        <button type="button" className="btn_close" onClick={() => handleCloseForm()}>
                            <img src={close_png} alt="fermer le formulaire" />
                        </button>
                        <h3>Menu du jour ( Modification )</h3>

                        <input type="text" name="id_menu" hidden value={selectedMenu.id_menu || ""} readOnly />

                        <label htmlFor="titre" className='titre'>
                            Nom du Menu :
                            <input
                                type="text"
                                name="nom"
                                id="titre"
                                value={selectedMenu.nom || ""}
                                onChange={(e) => setSelectedMenu({ ...selectedMenu, nom: e.target.value })}
                            />
                        </label>
                        <div className='border_top'></div>

                        <label htmlFor="entree" className='entree'>
                            Entrée :

                            <textarea
                                id="entree"
                                name="entree"
                                rows="2"
                                cols="50"
                                maxLength="250"
                                style={{ resize: 'none', overflowWrap: 'break-word' }}
                                value={selectedMenu.entree || ""}
                                onChange={(e) => setSelectedMenu({ ...selectedMenu, entree: e.target.value })}
                            ></textarea>

                        </label>

                        <div className='border_top'></div>

                        <label htmlFor="plat" className='plat'>
                            Plat :

                            <textarea
                                id="plat"
                                name="plat"
                                rows="2"
                                cols="50"
                                maxLength="250"
                                style={{ resize: 'none', overflowWrap: 'break-word' }}
                                value={selectedMenu.plat || ""}
                                onChange={(e) => setSelectedMenu({ ...selectedMenu, plat: e.target.value })}
                            ></textarea>

                        </label>

                        <div className='border_top'></div>

                        <label htmlFor="dessert" className='dessert'>
                            Dessert :

                            <textarea
                                id="dessert"
                                name="dessert"
                                rows="2"
                                cols="50"
                                maxLength="250"
                                style={{ resize: 'none', overflowWrap: 'break-word' }}
                                value={selectedMenu.dessert || ""}
                                onChange={(e) => setSelectedMenu({ ...selectedMenu, dessert: e.target.value })}
                            ></textarea>

                        </label>

                        <div className='border_top'></div>

                        <label htmlFor="boisson" className='boisson'>
                            Boisson :

                            <textarea
                                id="boisson"
                                name="boisson"
                                rows="2"
                                cols="50"
                                maxLength="250"
                                style={{ resize: 'none', overflowWrap: 'break-word' }}
                                value={selectedMenu.boisson || ""}
                                onChange={(e) => setSelectedMenu({ ...selectedMenu, boisson: e.target.value })}
                            ></textarea>

                        </label>

                        <div className='border_top'></div>

                        <label htmlFor="prix" className='prix'>
                            Prix en € :
                            <input
                                type="text"
                                name="prix"
                                id="prix"
                                value={selectedMenu.prix || ""}
                                onChange={(e) => setSelectedMenu({ ...selectedMenu, prix: e.target.value })}
                            />
                        </label>

                        <button type="submit" className="btn_send">Envoyer</button>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>

            )}
        </div>
    );
}

export default Menu;
