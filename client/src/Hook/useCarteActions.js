

/* *****************  Formulaire admin menu du jour **************************/



// hook pour gérer le clic sur le bouton ajouter
export const handleEditClick = (setFormAction, setSelectedArticles) => (article) => {
    setFormAction("PUT");
    setSelectedArticles(article);
};


export const handleAddArticle = (setFormAction, setSelectedArticles) => (id_categorie) => {
    setFormAction("POST");
    setSelectedArticles({
        nom: "",
        detail: "",
        prix: "",
        photo1: "",
        id_categorie
    });
};






// hook pour gérer le clic sur le bouton supprimer
export const handleDeleteClick = (setFormAction, setSelectedArticles) => async (article) => {
    setFormAction("DELETE");
    setSelectedArticles(null); // utile si tu veux afficher le formulaire ou confirmer

    try {
        const response = await fetch(`/admin/carte/${article.id_article}`, {
            method: "DELETE",
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message || "Article supprimé.");
            window.location.reload();
        } else {
            console.error("Erreur :", data.message);
        }
    } catch (err) {
        console.error("Erreur réseau :", err);
    }
};





// hook pour gérer le formulaire de menu avec pre remplissage des données de l'article
// modification de l'url en /admin/carte si le formulaire est un POST

export const handleArticle = async ({
    e,
    selectedArticles,
    formAction,
    //setArticleStates,
    setSelectedArticles,
    setErrorMessage,
}) => {
    e.preventDefault();

    const formData = {
        nom: selectedArticles?.nom || "",
        detail: selectedArticles?.detail || "",
        prix: selectedArticles?.prix || "",
        photo1: selectedArticles?.photo1 || "",
        id_categorie: selectedArticles?.id_categorie || null
    };

    // ✅ Construire l'URL dynamiquement
    const url =
        formAction === "POST"
            ? "/admin/carte"
            : `/admin/carte/${selectedArticles?.id_article}`;

    try {
        const response = await fetch(url, {
            method: formAction,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
            credentials: "include"
        });

        let data;
        try {
            data = await response.json();
        } catch (err) {
            console.error("Réponse non JSON :", await response.text());
            setErrorMessage("Le serveur a renvoyé une réponse inattendue.");
            return;
        }

        if (response.ok) {
            //setArticleStates(data.article);
            setSelectedArticles(null);
            alert(data.message || "Opération réussie.");
            window.location.reload();
        } else {
            setErrorMessage(data.message || "Une erreur est survenue.");
        }
    } catch (err) {
        console.error("Erreur réseau :", err);
        setErrorMessage("Une erreur réseau est survenue. Veuillez réessayer.");
    }
};


