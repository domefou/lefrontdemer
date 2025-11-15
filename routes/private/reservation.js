
const express = require('express');
const router = express.Router();
const { checkJWT } = require('../../middleware/secure');
const { addNewReservation } = require('../../services/reservation');


router.post('/', checkJWT, addNewReservation);

module.exports = router; 
