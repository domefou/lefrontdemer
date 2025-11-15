const express = require('express');
const { checkJWT } = require('../../../middleware/secure'); // ✅ destructuration



const { OneReservation,
    deleteReservation } = require('../../../services/reservation');

const router = express.Router();




router.get('/', checkJWT, OneReservation);
/*

router.post('/', checkJWT, addNewReservation);


router.put('/:id_article', checkJWT, updateReservation);

*/

router.delete('/:id_reservation', checkJWT, deleteReservation);

module.exports = router;