var express = require('express');
var router = express.Router();
const favoriteListController = require('../controllers/favoritelist');

//router.get('/getall', favoriteListController.getAll);
router.post('/insert/:username', favoriteListController.insert);


module.exports = router;