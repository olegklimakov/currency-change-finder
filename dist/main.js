"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExchangeRate = exports.setExchangeRate = void 0;
var data = [];
exports.setExchangeRate = function (firstCurrency, secondCurrency, exchangeRate) {
    data.push(firstCurrency);
};
exports.getExchangeRate = function (firstCurrency, secondCurrency) {
    console.log(data);
    return 5;
};
//# sourceMappingURL=main.js.map