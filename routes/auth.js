var express = require('express');
var router = express.Router();
const middlewareController = require('../controllers/middlewareController')
const authController = require('../controllers/authController');

router.post("/register", authController.register);
router.post("/login",authController.login);
router.post("/logout", middlewareController.verifyToken, authController.userLogout);


module.exports = router;