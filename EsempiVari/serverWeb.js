//include modulo http (componente di Node.js)
var http = require('http');
var url = require('url');
var querystring = require('querystring');

console.log("SERVER WEB JAVASCRIPT");

var cb = function (req, res) {

  //codice per capire la richiesta
  var page = url.parse(req.url).pathname;
  var metodo = req.method;
  console.log('page: ' + page);
  console.log('metodo: ' + metodo);

  if( metodo == 'GET' && page == '/page1' ) {

    var params = querystring.parse(url.parse(req.url, true).query);
    console.log('params:' + JSON.stringify(params));

    //risposta
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<p> Pagina1 </p>');
  } else if ( metodo == 'GET' && page == '/page2' ) {

    //risposta
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<p> Pagina2 </p>');
  } else {

    //risposta
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.write('<p> Pagina non trovata </p>');
  }

  res.end();
}

var server = http.createServer(cb);

server.listen(8080, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');




server.on('close', function() {
  console.log('Server stopped');
});