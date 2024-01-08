var express = require('express');
var router = express.Router();
const upload = require('../controllers/fileController');
const videoController = require('../controllers/videoController');
const middlewareController = require('../controllers/middlewareController')

router.post('/uploadvideo', middlewareController.verifyToken, upload.single('video'), videoController.create);

module.exports = router;