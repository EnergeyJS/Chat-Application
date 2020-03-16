const express = require('express');
const router = express.Router();

//  Import auth controller
const authController = require("./auth.controller");

//Login
router.post('/login', authController.login);

// export all router
module.exports = router;