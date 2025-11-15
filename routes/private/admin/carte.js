const express = require('express');
const { checkJWT } = require('../../../middleware/secure'); // ✅ destructuration
const Article = require('../../../models/article');
const Categorie = require('../../../models/categorie');


const { addNewArticle } = require('../../../services/article');
const { deleteArticle } = require('../../../services/article');
const { updateArticle } = require('../../../services/article');

const router = express.Router();




router.get('/', checkJWT, async (req, res) => {
    const article = await Article.findAll();
    const categorie = await Categorie.findAll()
    res.json(article, categorie);
});

router.post('/', checkJWT, addNewArticle);


router.put('/:id_article', checkJWT, updateArticle);



router.delete('/:id_article', checkJWT, deleteArticle);


module.exports = router;