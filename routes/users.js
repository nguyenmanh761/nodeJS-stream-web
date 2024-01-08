var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const middlewareController = require('../controllers/middlewareController')
/* GET users listing. */
router.get('/getall', middlewareController.verifyTokenAdminAuth, userController.getAll);
router.get('/getbyusername/:username', userController.getByUsername);
router.post('/new', userController.create);
router.put('/update/:username', userController.update);
router.delete('/delete/', middlewareController.verifyTokenAndAdminAuth, userController.delete);

module.exports = router;
