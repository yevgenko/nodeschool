var duplexer = require('duplexer2'),
    through = require('through2').obj;

module.exports = function (counter) {
  var counts = {},
      writable = through(write, end);

  function write(row, _, next) {
    counts[row.country] = (counts[row.country] || 0) + 1;
    next();
  }

  function end(done) {
    counter.setCounts(counts);
    done();
  }

  return duplexer({objectMode: true}, writable, counter);
};
