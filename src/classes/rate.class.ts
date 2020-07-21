import { makeObjectKey } from "../utils";

export class Rate {
    key: string;
    exchangeRate: number;
    constructor(public first: string, public second: string, rate: number) {
        this.exchangeRate = parseFloat(rate.toFixed(6)); // for better double calculation
        this.key = makeObjectKey(first, second); // generate a readable hash key
    }


    isReverted(rate: Rate): boolean {
        return (rate.first === this.second) && (rate.second === this.first);
    }


    isTheSame(first: string, second: string): boolean {
        return (this.first === first) && (this.second === second);
    }
}
