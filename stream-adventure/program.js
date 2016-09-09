var filepath = process.argv[2],
    fs = require('fs');

fs.createReadStream(filepath).pipe(process.stdout);
