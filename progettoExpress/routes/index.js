var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test/:param1', function(req, res, next) {
  res.setHeader('Content-type', 'text/html');
  res.render('pagina1', {param1 : req.params.param1});
});

module.exports = router;
