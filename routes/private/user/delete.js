const express = require('express');
const { checkJWT } = require('../../../middleware/secure'); // ✅ destructuration

const router = express.Router();

const { deleteUser } = require('../../../services/user');


router.delete('/', checkJWT, (req, res, next) => {
    console.log("DELETE reçu sur /user/compte", req.params);
    next();
}, deleteUser);




module.exports = router;