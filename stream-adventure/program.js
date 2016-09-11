var combine = require('stream-combiner'),
    split = require('split'),
    through = require('through2').obj,
    zlib = require('zlib');

module.exports = function () {
  var currentGenre;
  var reduce = through(write, end);

  function write(line, _, next) {
    if (line.length === 0) return next();

    var obj = JSON.parse(line);
    if (obj.type === 'genre') {
      if (currentGenre) {
        this.push(JSON.stringify(currentGenre) + '\n');
      }
      currentGenre = { name: obj.name, books: [] };
    } else if (obj.type === 'book') {
      currentGenre.books.push(obj.name);
    }

    next();
  }

  function end(done) {
    // the last genre object
    if (currentGenre) {
      this.push(JSON.stringify(currentGenre) + '\n');
    }

    done();
  }

  return combine(split(), reduce, zlib.createGzip());
};
