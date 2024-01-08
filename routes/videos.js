var express = require('express');
var router = express.Router();
const videoController = require('../controllers/videoController');
const middlewareController = require('../controllers/middlewareController')
const upload = require('../controllers/fileController');

router.get('/getall', videoController.getAll);
router.get('/getbyid/:id', videoController.getById);
router.post('/new', middlewareController.verifyTokenAdminAuth,upload.single('video'), videoController.create);
router.put('/update/:id', middlewareController.verifyTokenAdminAuth,videoController.update);
router.delete('/delete/:id', middlewareController.verifyTokenAdminAuth,videoController.delete);

module.exports = router; 