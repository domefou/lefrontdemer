import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import axios from "axios";

import '../styles/desktop/carte.scss';
import '../styles/desktop/menuDuJour.scss';

import '../styles/mobile/carte.scss';
import '../styles/mobile/menuDuJour.scss';


import Layout from "../components/layout";

import {
    handleAddArticle,
    handleArticle
} from '../Hook/useCarteActions';

import Card from "../components/card";
import Menu from "../components/menuDuJour"

import Entree_banner from "../assets/image/fish-4069541_1280.jpg";
import Plat_banner from "../assets/image/meal-2002918_1920.jpg";
import Dessert_banner from "../assets/image/strawberries-7256431_1920.jpg";

import add_png from "../assets/image/icons/add.png";
import close_png from "../assets/image/icons/close.png";
import arrow from "../assets/image/icons/right-arrow.png";


const Carte = () => {
    const { user } = useContext(AuthContext);
    //const [articleState, setArticleStates] = useState([null]);
    const [selectedArticles, setSelectedArticles] = useState(null);
    const [formAction, setFormAction] = useState("PUT");
    const [errorMessage, setErrorMessage] = useState("");

    const [articles, setArticles] = useState([]);
    const [menus, setMenus] = useState([]);

    const onAddArticleClick = handleAddArticle(setFormAction, setSelectedArticles);


    const onHandleArticle = (e) => {
        handleArticle({
            e,
            selectedArticles,
            formAction,
            //setArticleStates,
            setSelectedArticles,
            setErrorMessage,
        });
    };



    useEffect(() => {
        axios.get('/carte')
            .then(response => {
                setArticles(response.data.articles); // ✅ tableau d'articles
                setMenus(response.data.menu);
                //setUsers(response.data);
            })
            .catch(error => {
                console.error("Erreur lors du chargement des articles :", error);
            });
    }, []);



    if (!Array.isArray(articles)) {
        console.warn("articles n'est pas un tableau :", articles);
        return <p className="text-center">Aucune donnée reçue</p>;
    }

    /*const articlesValides = articles.filter(
        article => article && typeof article === 'object' && article.nom
    );*/





    // Filtrer les articles par catégorie
    const getArticlesByCategorie = (id) =>
        articles.filter(article => article.id_categorie === id);


    const handleCloseForm = () => {
        setSelectedArticles(null); // Cela cache le formulaire
    };




    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }



    return (
        <main>


            <Layout>
                <div className="container_gen">

                    <div className="navButton">
                        <div className="none">

                        </div>
                        <div className="ancre">
                            <a className="link_entree" href="#link_entree">Entrée</a>
                            <a className="link_plat" href="#link_plat">Plat</a>
                            <a className="link_dessert" href="#link_dessert">Dessert</a>

                        </div>

                        <button className="reset_scroll" onClick={scrollToTop}>
                            <img src={arrow} alt="retourner en haut de la page" />
                        </button>

                    </div>

                    <Menu menus={menus} />

                    <div className="banner_carte" id="link_entree">
                        <h3 className="banner_title">Entrées</h3>
                        <img src={Entree_banner} alt="banniere entrée" />

                    </div>


                    <Card articles={getArticlesByCategorie(1)} />
                    {user && user.role === "admin" && (
                        <div className="admin-modification">
                            <h3>Cliquez ci-dessous pour ajouter une nouvelle entrée </h3>
                            <button className="btn_add" onClick={() => onAddArticleClick(1)}>
                                <img src={add_png} alt="ajouter une entrée" />
                            </button>
                        </div>
                    )}



                    {formAction === "POST" && selectedArticles?.id_categorie === 1 && (

                        <div className="container_form_add">
                            <form onSubmit={onHandleArticle} className="form_add">

                                <button type="button" className="btn_close" onClick={() => handleCloseForm()}>
                                    <img src={close_png} alt="fermer le formulaire" />
                                </button>
                                <input

                                    type="text"
                                    name="id_menu"
                                    hidden
                                    value={selectedArticles.id_article || ""}
                                    readOnly
                                />

                                <label htmlFor="titre" className="titre">
                                    Titre
                                    <input

                                        type="text"
                                        name="nom"
                                        id="titre"
                                        value={selectedArticles.nom || ""}
                                        onChange={(e) =>
                                            setSelectedArticles({ ...selectedArticles, nom: e.target.value })
                                        }
                                    />
                                </label>


                                <label htmlFor="detail" className="detail">
                                    Détail

                                    <textarea
                                        id="detail"
                                        name="detail"
                                        rows="3"
                                        cols="50"
                                        maxLength="250"
                                        style={{ resize: 'none', overflowWrap: 'break-word' }}
                                        value={selectedArticles.detail || ""}
                                        onChange={(e) =>
                                            setSelectedArticles({ ...selectedArticles, detail: e.target.value })
                                        }
                                    ></textarea>

                                </label>


                                <label htmlFor="photo" className="photo">
                                    Lien de la photo (URL)

                                    <textarea
                                        id="photo"
                                        name="photo1"
                                        rows="3"
                                        cols="50"
                                        maxLength="250"
                                        style={{ resize: 'none', overflowWrap: 'break-word' }}
                                        value={selectedArticles.photo1 || ""}
                                        onChange={(e) =>
                                            setSelectedArticles({ ...selectedArticles, photo1: e.target.value })
                                        }
                                    ></textarea>
                                    <small>* Type portait recommandé</small>
                                </label>

                                <label htmlFor="prix" className="prix">
                                    Prix
                                    <input
                                        type="text"
                                        name="prix"
                                        id="prix"
                                        value={selectedArticles.prix || ""}
                                        onChange={(e) =>
                                            setSelectedArticles({ ...selectedArticles, prix: e.target.value })
                                        }
                                    />
                                </label>

                                <button type="submit" className="btn_send">Envoyer</button>
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                            </form>

                        </div>
                    )}



                    <div className="banner_carte">
                        <h3 className="banner_title">Plats</h3>
                        <img src={Plat_banner} alt="banniere plat" id="link_plat" />
                    </div>


                    <Card articles={getArticlesByCategorie(2)} />

                    {user && user.role === "admin" && (
                        <div className="admin-modification">
                            <h3>Cliquez ci-dessous pour ajouter un nouveau plat</h3>
                            <button className="btn_add" onClick={() => onAddArticleClick(2)}>
                                <img src={add_png} alt="ajouter un plat" />
                            </button>
                        </div>
                    )}









                    {formAction === "POST" && selectedArticles?.id_categorie === 2 && (

                        <div className="container_form_add">
                            <form onSubmit={onHandleArticle} className="form_add">
                                <button type="button" className="btn_close" onClick={() => handleCloseForm()}>
                                    <img src={close_png} alt="fermer le formulaire" />
                                </button>
                                <input
                                    type="text"
                                    name="id_menu"
                                    hidden
                                    value={selectedArticles.id_article || ""}
                                    readOnly
                                />

                                <label htmlFor="titre" className="titre">
                                    Titre
                                    <input

                                        type="text"
                                        name="nom"
                                        id="titre"
                                        value={selectedArticles.nom || ""}
                                        onChange={(e) =>
                                            setSelectedArticles({ ...selectedArticles, nom: e.target.value })
                                        }
                                    />
                                </label>


                                <label htmlFor="detail" className="detail">
                                    Détail

                                    <textarea
                                        id="detail"
                                        name="detail"
                                        rows="3"
                                        cols="50"
                                        maxLength="250"
                                        style={{ resize: 'none', overflowWrap: 'break-word' }}
                                        value={selectedArticles.detail || ""}
                                        onChange={(e) =>
                                            setSelectedArticles({ ...selectedArticles, detail: e.target.value })
                                        }
                                    ></textarea>

                                </label>


                                <label htmlFor="photo" className="photo">
                                    Lien de la photo (URL)

                                    <textarea
                                        id="photo"
                                        name="photo1"
                                        rows="3"
                                        cols="50"
                                        maxLength="250"
                                        style={{ resize: 'none', overflowWrap: 'break-word' }}
                                        value={selectedArticles.photo1 || ""}
                                        onChange={(e) =>
                                            setSelectedArticles({ ...selectedArticles, photo1: e.target.value })
                                        }
                                    ></textarea>
                                    <small>* Type portait recommandé</small>
                                </label>


                                <label htmlFor="prix" className="prix">
                                    Prix
                                    <input
                                        type="text"
                                        name="prix"
                                        id="prix"
                                        value={selectedArticles.prix || ""}
                                        onChange={(e) =>
                                            setSelectedArticles({ ...selectedArticles, prix: e.target.value })
                                        }
                                    />
                                </label>

                                <button type="submit" className="btn_send">Envoyer</button>
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                            </form>

                        </div>
                    )}









                    <div className="banner_carte">
                        <h3 className="banner_title">Desserts</h3>
                        <img src={Dessert_banner} alt="banniere dessert" id="link_dessert" />
                    </div>


                    <Card articles={getArticlesByCategorie(3)} />

                    {user && user.role === "admin" && (
                        <div className="admin-modification">
                            <h3>Cliquez ci-dessous pour ajouter un nouveau dessert</h3>
                            <button className="btn_add" onClick={() => onAddArticleClick(3)}>
                                <img src={add_png} alt="ajouter un dessert" />
                            </button>
                        </div>
                    )}


                    {formAction === "POST" && selectedArticles?.id_categorie === 3 && (
                        <div className="container_form_add">


                            <form onSubmit={onHandleArticle} className="form_add">

                                <button type="button" className="btn_close" onClick={() => handleCloseForm()}>
                                    <img src={close_png} alt="fermer le formulaire" />
                                </button>
                                <input
                                    type="text"
                                    name="id_menu"
                                    hidden
                                    value={selectedArticles.id_article || ""}
                                    readOnly
                                />

                                <label htmlFor="titre" className="titre">
                                    Titre
                                    <input

                                        type="text"
                                        name="nom"
                                        id="titre"
                                        value={selectedArticles.nom || ""}
                                        onChange={(e) =>
                                            setSelectedArticles({ ...selectedArticles, nom: e.target.value })
                                        }
                                    />
                                </label>

                                <label htmlFor="detail" className="detail">
                                    Détail

                                    <textarea
                                        id="detail"
                                        name="detail"
                                        rows="3"
                                        cols="50"
                                        maxLength="250"
                                        style={{ resize: 'none', overflowWrap: 'break-word' }}
                                        value={selectedArticles.detail || ""}
                                        onChange={(e) =>
                                            setSelectedArticles({ ...selectedArticles, detail: e.target.value })
                                        }
                                    ></textarea>

                                </label>


                                <label htmlFor="photo" className="photo">
                                    Lien de la photo (URL)

                                    <textarea
                                        id="photo"
                                        name="photo1"
                                        rows="3"
                                        cols="50"
                                        maxLength="250"
                                        style={{ resize: 'none', overflowWrap: 'break-word' }}
                                        value={selectedArticles.photo1 || ""}
                                        onChange={(e) =>
                                            setSelectedArticles({ ...selectedArticles, photo1: e.target.value })
                                        }
                                    ></textarea>
                                    <small>* Type portait recommandé</small>
                                </label>


                                <label htmlFor="prix" className="prix">
                                    Prix
                                    <input
                                        type="text"
                                        name="prix"
                                        id="prix"
                                        value={selectedArticles.prix || ""}
                                        onChange={(e) =>
                                            setSelectedArticles({ ...selectedArticles, prix: e.target.value })
                                        }
                                    />
                                </label>

                                <button type="submit" className="btn_send">Envoyer</button>
                                {errorMessage && <p className="error-message">{errorMessage}</p>}
                            </form>

                        </div>
                    )}

                </div>
            </Layout>

        </main>

    );
};

export default Carte;




