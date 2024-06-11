const express = require("express");

const router = express.Router();
const { signupUser } = require('../controller/user-controller.js'); // Corrected spelling
const { loginUser } = require('../controller/user-controller.js'); // Corrected spelling

router.post('/signup', signupUser); // Corrected spelling
router.post('/login', loginUser); // Corrected spelling
module.exports = router;
