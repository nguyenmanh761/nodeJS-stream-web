var express = require('express');
var router = express.Router();
const videoController = require('../controllers/videoController');
var array = [1,5,78,4,2,9];
/* GET home page. */
router.get('/', function(req, res, next) {
   res.render('index');
   
});

router.get('/getdata',function(req,res,next){
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  // next();

  res.send(array);
})

module.exports = router;
