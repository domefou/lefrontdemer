const Menu = require('../models/menu');



const updateMenu = async (req, res) => {
    const { id_menu } = req.params;
    const { nom, entree, plat, dessert, boisson, prix } = req.body;

    try {
        const [updated] = await Menu.update(
            { nom, entree, plat, dessert, boisson, prix },
            { where: { id_menu } }
        );

        if (updated) {
            res.json({ message: 'Menu mis à jour avec succès' });
        } else {
            res.status(404).json({ message: 'Menu non trouvé ou non modifié' });
        }
    } catch (err) {
        console.error("Erreur serveur :", err);
        res.status(500).json({ message: 'Erreur serveur lors de la mise à jour' });
    }
};



const deleteMenu = async (req, res) => {
    const { id_menu } = req.params;

    try {
        const deleted = await Menu.destroy({ where: { id_menu } });
        if (deleted) {
            res.json({ message: 'Menu supprimé avec succès' });
        } else {
            res.status(404).json({ message: 'Menu non trouvé' });
        }
    } catch (err) {
        console.error("Erreur serveur :", err);
        res.status(500).json({ message: 'Erreur serveur lors de la suppression' });
    }
};


module.exports = {
    updateMenu: updateMenu,
    deleteMenu: deleteMenu
};
