

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


/* *****************  Formulaire admin menu du jour **************************/



// hook pour gérer le clic sur le bouton ajouter
export const handleEditClick = (setFormAction, setSelectedMenu) => (menu) => {
    setFormAction("PUT");
    setSelectedMenu(menu);
};



export const handleAddMenu = (setFormAction, setSelectedMenu) => {
    setFormAction("POST");
    setSelectedMenu({
        nom: "",
        entree: "",
        plat: "",
        dessert: "",
        boisson: "",
        prix: "",
    });
};






// hook pour gérer le clic sur le bouton supprimer
export const handleDeleteClick = (setFormAction, setSelectedMenu) => async (menu) => {
    setFormAction("DELETE");
    setSelectedMenu(menu);

    try {
        const response = await fetch(`${API_URL}/admin/menu/${menu.id_menu}`, {
            method: "DELETE",
            credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message || "Menu supprimé.");
            window.location.reload();
        } else {
            console.error("Erreur :", data.message);
        }
    } catch (err) {
        console.error("Erreur réseau :", err);
    }
};



// hook pour gérer le formulaire de menu avec pre remplissage des données du menu du jour
export const handleMenu = async ({
    e,
    selectedMenu,
    formAction,
    setMenusState,
    setSelectedMenu,
    setErrorMessage,
}) => {
    e.preventDefault();

    const formData = {
        nom: selectedMenu?.nom || "",
        entree: selectedMenu?.entree || "",
        plat: selectedMenu?.plat || "",
        dessert: selectedMenu?.dessert || "",
        boisson: selectedMenu?.boisson || "",
        prix: selectedMenu?.prix || "",
    };

    try {
        // Choisir l’URL selon l’action
        const url = formAction === "POST"
            ? `${API_URL}/admin/menu`              // création
            : `${API_URL}/admin/menu/${selectedMenu?.id_menu}`; // modification

        const response = await fetch(url, {
            method: formAction,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
            credentials: 'include'
        });

        const text = await response.text();

        try {
            const data = JSON.parse(text);

            if (response.ok) {
                setMenusState(data.menu);
                setSelectedMenu(null);
                alert(data.message || "Opération réussie.");
                window.location.reload();
            } else {
                setErrorMessage(data.message || "Une erreur est survenue.");
            }
        } catch (err) {
            console.error("Réponse non JSON :", text);
            setErrorMessage("Le serveur a renvoyé une réponse inattendue.");
        }
    } catch (err) {
        console.error('Erreur réseau :', err);
        setErrorMessage("Une erreur réseau est survenue. Veuillez réessayer.");
    }
};


