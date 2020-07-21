//import { getExchangeRate } from '../dist/index.js';
// import * as lib from '../dist/index.js'
// import generated from "";

var lib = require("../dist/index.js");

lib.setExchangeRate('first', 'second', 5);

console.log(lib.getExchangeRate('some', 'some'));
