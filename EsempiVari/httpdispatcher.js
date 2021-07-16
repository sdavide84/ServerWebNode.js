class HttpDispatcher {

  constructor() {
    this.listeners = { get: [], post: [] };
    this.errorListener = function () { };
    this.staticFolderPrefix = '/static';
  }

  setStatic(folder) {
    this.staticFolderPrefix = folder;
  }

  onError(cb) {
    this.errorListener = cb;
  }

  on(method, url, cb) {
    this.listeners[method].push({
      cb: cb,
      url: url
    });
  }

  onGet(url, cb) {
    this.on('get', url, cb);
  }

  onPost(url, cb) {
    this.on('post', url, cb);
  }

  staticListener(req, res) {
    var url = require('url').parse(req.url, true);
    var filename = require('path').join(".", url.pathname);
    var errorListener = this.errorListener;
    require('fs').readFile(filename, function (err, file) {
      if (err) {
        errorListener(req, res);
        return;
      }
      res.writeHeader(200,
        { "Content-Type": require('mime').lookup(filename) });
      res.write(file, 'binary');
      res.end();
    });
  }

  dispatch(req, res) {
    var parsedUrl = require('url').parse(req.url, true);

    if (parsedUrl.pathname.indexOf(this.staticFolderPrefix) == 0) {
      this.staticListener(req, res);
      return;
    }

    var method = req.method.toLowerCase();

    if (method == 'post') {
      var body = '';
      req.on('data', function (data) {
        body += data;
      });
      req.on('end', function () {
        var post = require('querystring').parse(body);
        req.params = post; //aggancio un nuovo attributo
        doDispatch.call(dispatcher);
      });
    } else {
      var url_parts = require('url').parse(req.url, true);
      req.params = url_parts.query; //aggancio un nuovo attributo
    }

    console.log("this.listener: " + this.listener);

    if (this.listener[method][parsedUrl.pathname])
      this.listener[method][parsedUrl.pathname](req, res);
    else
      this.errorListener(req, res);
  }

}

module.exports = new HttpDispatcher();