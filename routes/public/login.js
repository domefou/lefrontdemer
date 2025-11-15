const express = require('express');
const router = express.Router();
const { authenticate } = require('../../services/user');

router.get('/', async (req, res) => {

});



router.post('/', authenticate);


module.exports = router;