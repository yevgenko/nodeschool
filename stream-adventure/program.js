var crypto = require('crypto'),
    decrypter = crypto.createDecipher(process.argv[2], process.argv[3]),
    zlib = require('zlib'),
    unZipper = zlib.createGunzip(),
    tar = require('tar'),
    tarParser = tar.Parse(),
    through = require('through2'), // for my original solution
    concat = require('concat-stream');

tarParser.on('entry', function (entry) {
  if (entry.type === 'File') {
    entry
      .pipe(crypto.createHash('md5', {encoding: 'hex'}))
      .pipe(concat(function (hash) {
        console.log(hash + ' ' + entry.path);
      }))
    ;

    /**
     * My original solution
     *
     * Passed verification, but there is problem.
     *
     * `concat` calls function with all data received from stream
     * while `through` `write` can be called a number of times
     * depend on the buffer size, so, my solution would fail with
     * small buffer.
     */
    // entry
    //   .pipe(crypto.createHash('md5', {encoding: 'hex'}))
    //   .pipe(through(write))
    // ;

    // function write(buf, _, next) {
    //   console.log(buf.toString() + ' ' + entry.path);
    //   next();
    // }
  }
});

process.stdin
  .pipe(decrypter)
  .pipe(unZipper)
  .pipe(tarParser)
;
