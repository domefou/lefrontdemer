const express = require('express');
const { checkJWT } = require('../../../middleware/secure'); // ✅ destructuration
const Menu = require('../../../models/menu');

const { deleteMenu, addMenu, updateMenu } = require('../../../services/menuDuJour');

const router = express.Router();




router.get('/', checkJWT, async (req, res) => {
    const menu = await Menu.findAll();
    res.json(menu);
});

router.post('/', checkJWT, addMenu);

router.put('/:id_menu', checkJWT, updateMenu);



router.delete('/:id_menu', checkJWT, deleteMenu);


module.exports = router;