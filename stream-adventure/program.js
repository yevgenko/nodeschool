var concat = require('concat-stream');

function reverse(str) {
  return str.split('').reverse().join('');
}

process.stdin
  .pipe(concat(function (src) {
    console.log(reverse(src.toString()))
  }));
