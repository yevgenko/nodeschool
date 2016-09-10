var through = require('through2'),
    http = require('http');

function write(buf, _, next) {
  this.push(buf.toString().toUpperCase());
  next();
}

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(through(write)).pipe(res);
  }
})
server.listen(process.argv[2]);
