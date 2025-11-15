const express = require('express');
const router = express.Router();
const { mailVerify } = require('../../middleware/secure');
const { newPassword, requestReset } = require('../../services/user');



router.put('/confirm/:token/:mail', mailVerify, newPassword);


router.post('/request', requestReset);


module.exports = router;

