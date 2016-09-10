var spawn = require('child_process').spawn,
    duplexer = require('duplexer2');

module.exports = function (cmd, args) {
  var cmdProc = spawn(cmd, args);
  return duplexer(cmdProc.stdin, cmdProc.stdout);
};
