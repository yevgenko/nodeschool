var trumpet = require('trumpet'),
    through = require('through2'),
    tr = trumpet();

function write(buf, _, next) {
  this.push(buf.toString().toUpperCase());
  next();
}

var stream = tr.select('.loud').createStream();
// read pipe: reads inner html
// write pipe: replaced inner html
stream.pipe(through(write)).pipe(stream);

process.stdin.pipe(tr).pipe(process.stdout);
