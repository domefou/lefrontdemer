const Article = require('../models/article');

const addNewArticle = async (req, res) => {
    const { nom, detail, photo1, prix, id_categorie } = req.body;

    const articleData = {
        nom,
        detail,
        prix,
        id_categorie,
        ...(photo1 && photo1.trim() !== '' ? { photo1 } : {})
    };



    try {
        const created = await Article.create(articleData);

        if (created) {
            res.json({ message: 'Article ajouté avec succès' });
        } else {
            res.status(404).json({ message: 'Article non ajouté' });
        }
    } catch (err) {
        console.error("Erreur serveur :", err);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour' });
    }
};


const updateArticle = async (req, res) => {
    const { id_article } = req.params;
    const { nom, detail, photo1, prix } = req.body;

    // Construire dynamiquement l'objet de mise à jour
    const updateData = {
        nom,
        detail,
        prix,
        ...(photo1 && photo1.trim() !== '' ? { photo1 } : {})
    };

    try {
        const [updated] = await Article.update(updateData, {
            where: { id_article }
        });

        if (updated) {
            res.json({ message: 'Article mis à jour avec succès' });
        } else {
            res.status(404).json({ message: 'Article non trouvé ou non modifié' });
        }
    } catch (err) {
        console.error("Erreur serveur :", err);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour' });
    }
};




const deleteArticle = async (req, res) => {
    const { id_article } = req.params;

    try {
        const deleted = await Article.destroy({ where: { id_article } });
        if (deleted) {
            res.json({ message: 'Article supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Article non trouvé' });
        }
    } catch (err) {
        console.error("Erreur serveur :", err);
        res.status(500).json({ message: 'Erreur serveur lors de la suppression' });
    }
};


module.exports = {
    addNewArticle: addNewArticle,
    updateArticle: updateArticle,
    deleteArticle: deleteArticle
};
