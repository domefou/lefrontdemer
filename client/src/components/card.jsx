import { useState, useContext } from 'react';

import { AuthContext } from "../context/AuthContext";

import update_png from "../assets/image/icons/update.png";
import delete_png from "../assets/image/icons/delete.png";
import close_png from "../assets/image/icons/close.png";

import {
    handleEditClick,
    handleDeleteClick,
    handleArticle
} from '../Hook/useCarteActions';



function Card({ articles }) {

    const { user } = useContext(AuthContext);
    //const [articleState, setArticleState] = useState([""]);
    const [selectedArticles, setSelectedArticles] = useState(null);
    const [formAction, setFormAction] = useState("PUT");
    const [errorMessage, setErrorMessage] = useState("");


    if (!Array.isArray(articles)) {
        console.warn("articles n'est pas un tableau :", articles);
        return <p className="text-center">Aucune donnée reçue</p>;
    }

    const articlesValides = articles.filter(
        article => article && typeof article === 'object' && article.nom
    );





    const onEditClick = handleEditClick(setFormAction, setSelectedArticles);


    const onDeleteClick = handleDeleteClick(setFormAction, setSelectedArticles);

    const onHandleArticle = (e) => handleArticle({
        e,
        selectedArticles,
        formAction,
        //setArticleState,
        setSelectedArticles,
        setErrorMessage,
    });

    const handleCloseForm = () => {
        setSelectedArticles(null); // Cela cache le formulaire
    };




    return (
        <div className="row row-cols-1 g-2 mt-2 container_card">
            {articlesValides.length > 0 ? (
                articlesValides.map((article, index) => (
                    <div className="container_content" key={index}>
                        <div className="container_top">
                            <div className='border_top'></div>
                            <h4>{article.nom}</h4>
                        </div>

                        <div className="container_down">
                            {article.photo1 && (
                                <img
                                    className="container_image"
                                    src={article.photo1}
                                    alt={article.nom}
                                    loading="lazy"
                                />
                            )}

                            <div className="container_detail">
                                <p className="text">{article.detail || "Aucun détail"}</p>
                            </div>

                            <div className="container_prix">
                                <p className="text">Prix TTC :</p>
                                <p className="text">{article.prix} €</p>
                            </div>

                            {user && user.role === "admin" && (
                                <div className="btn_modificate">
                                    <button className="btn_update" onClick={() => onEditClick(article)}>
                                        <img src={update_png} alt="modifier contenu" />
                                    </button>
                                    <button
                                        className="btn_delete"
                                        onClick={() => onDeleteClick(article)}
                                    >
                                        <img src={delete_png} alt="supprimer contenu" />
                                    </button>

                                </div>
                            )}
                        </div>

                        {selectedArticles?.id_article === article.id_article && (
                            <form onSubmit={onHandleArticle} className="form_card">

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

                                <label htmlFor="titre" className='titre'>
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

                                <div className='border_top'></div>

                                <label htmlFor="detail" className='detail'>
                                    Détail

                                    <textarea
                                        id="detail"
                                        name="detail"
                                        rows="3"
                                        cols="50"
                                        maxLength="200"
                                        style={{ resize: 'none', overflowWrap: 'break-word' }}
                                        value={selectedArticles.detail || ""}
                                        onChange={(e) =>
                                            setSelectedArticles({ ...selectedArticles, detail: e.target.value })
                                        }
                                    ></textarea>

                                </label>

                                <div className='border_top'></div>

                                <label htmlFor="photo" className='photo'>
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

                                <div className='border_top'></div>

                                <label htmlFor="prix" className='prix'>
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
                        )}
                    </div>
                ))
            ) : (
                <p className="text-center">Veuillez patienter ...</p>
            )}
        </div>
    );

}

export default Card;
