"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rate = void 0;
const utils_1 = require("../utils");
class Rate {
    constructor(first, second, rate) {
        this.first = first;
        this.second = second;
        this.exchangeRate = parseFloat(rate.toFixed(6)); // for better double calculation
        this.key = utils_1.makeObjectKey(first, second); // generate a readable hash key
    }
    isReverted(rate) {
        return (rate.first === this.second) && (rate.second === this.first);
    }
    isTheSame(first, second) {
        return (this.first === first) && (this.second === second);
    }
}
exports.Rate = Rate;
//# sourceMappingURL=rate.class.js.map