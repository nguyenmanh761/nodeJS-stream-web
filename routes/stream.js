var express = require('express');
var router = express.Router();
const streamController = require('../controllers/streamController');

router.get('/:id', streamController.stream);

module.exports = router;