//import { getExchangeRate } from '../dist/index.js';
// import * as lib from '../dist/index.js'
// import generated from "";

var lib = require("../dist/index.js");

// lib.setExchangeRate('USD', 'EUR', 0.5);
// lib.setExchangeRate('USD', 'RUB', 0.8);
// lib.setExchangeRate('EUR', 'RUB', 0.35);
// lib.setExchangeRate('SEK', 'CAD', 0.2);
// lib.setExchangeRate('EUR', 'CAD', 28);
// lib.setExchangeRate('USD', 'CAD', 28);
lib.setExchangeRate('EUR', 'RUB', 0.5);
lib.setExchangeRate('RUB', 'USD', 0.8);
lib.setExchangeRate('USD', 'SEK', 0.35);
lib.setExchangeRate('SEK', 'CAD', 0.2);
// lib.setExchangeRate('EUR', 'CAD', 28);
// lib.setExchangeRate('USD', 'CAD', 28);

console.log(lib.getExchangeRate('EUR', 'CAD'));
