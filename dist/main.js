"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExchangeRate = exports.setExchangeRate = void 0;
const rate_class_1 = require("./classes/rate.class");
const utils_1 = require("./utils");
// in that case it is better to use hashmap table (in object realization) for faster set and update flow;
const dataStorage = {};
exports.setExchangeRate = (firstCurrency, secondCurrency, exchangeRate) => {
    const direct = new rate_class_1.Rate(firstCurrency, secondCurrency, exchangeRate);
    const reverted = new rate_class_1.Rate(secondCurrency, firstCurrency, 1 / direct.exchangeRate);
    dataStorage[direct.key] = direct;
    dataStorage[reverted.key] = reverted;
};
exports.getExchangeRate = (firstCurrency, secondCurrency) => {
    if (!Object.keys(dataStorage).length) {
        return;
    } // storage is empty
    return utils_1.findRate(firstCurrency, secondCurrency, dataStorage);
};
//# sourceMappingURL=main.js.map