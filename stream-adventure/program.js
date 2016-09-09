var through = require('through2'),
    split = require('split'),
    stream = through(write),
    lineCounter = 0;

function isEven(n) { return n % 2 == 0; }

function changeLine(line) {
  lineCounter += 1;

  if (isEven(lineCounter)) {
    return line.toUpperCase();
  } else {
    return line.toLowerCase();
  }
}

function write(line, _, next) {
  this.push(changeLine(line.toString()) + '\n');
  next();
}

process.stdin
  .pipe(split())
  .pipe(stream)
  .pipe(process.stdout)
