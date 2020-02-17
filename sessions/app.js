const myModule = require('./logger');
const myArithmaticModule = require('./arithmatic');

const logger = myModule.logger;
console.log('adding two numbers => 1 + 2 =', myArithmaticModule.addFunction(1,2));
// console.log(logger);