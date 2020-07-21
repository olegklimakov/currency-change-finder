const lib = require("../dist/index.js");

lib.setExchangeRate('EUR', 'RUB', 0.5);
lib.setExchangeRate('RUB', 'USD', 0.8);
lib.setExchangeRate('USD', 'SEK', 0.35);
lib.setExchangeRate('SEK', 'CAD', 0.2);

console.log(lib.getExchangeRate('EUR', 'CAD'));
