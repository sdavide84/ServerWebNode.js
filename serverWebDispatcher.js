var dispatcher = require('./httpdispatcher');

console.log("dispatcher: " + JSON.stringify(dispatcher));

dispatcher.onGet("/page1", function(req, res) {
    console.log("SIAMO IN dispatcher.onGet");
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Page One');
});
dispatcher.onPost("/page2", function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Page Two');
});
require('http').createServer(function (req, res) {
  dispatcher.dispatch(req, res);
}).listen(1337, '127.0.0.1');