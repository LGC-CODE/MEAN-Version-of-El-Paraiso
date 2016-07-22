var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var admin = mongoose.model('adminSchema');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/adminUp', function(req, res, next){

});

module.exports = router;
