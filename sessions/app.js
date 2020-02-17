const http = require('http');
var fs = require('fs');
// const myModule = require('./logger');
// const myArithmaticModule = require('./arithmatic');

// const logger = myModule.logger;
// console.log('adding two numbers => 1 + 2 =', myArithmaticModule.addFunction(1,2));
// console.log(logger);

const requestListener = function (req, res) {
  const fileContent = fs.readFileSync('./fileToRead.txt', 'utf8');
  res.writeHead(200);
  res.end(fileContent);
}

const server = http.createServer(requestListener);
server.listen(4000);

console.log('Express server started on port %s', server.address().port);