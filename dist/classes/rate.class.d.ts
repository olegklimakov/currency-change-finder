export declare class Rate {
    first: string;
    second: string;
    key: string;
    exchangeRate: number;
    constructor(first: string, second: string, rate: number);
    isReverted(rate: Rate): boolean;
    isTheSame(first: string, second: string): boolean;
}
