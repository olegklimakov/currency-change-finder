import { DataStorageModel } from "./models/data-storage.model";
import { Rate } from "./classes/rate.class";
import { findRate } from "./utils";

// in that case it is better to use hashmap table (in object realization) for faster set and update flow;
export const dataStorage: DataStorageModel = {};

export const setExchangeRate = (firstCurrency: string, secondCurrency: string, exchangeRate: number): void => {
    const direct = new Rate(firstCurrency, secondCurrency, exchangeRate);
    const reverted = new Rate(secondCurrency, firstCurrency, 1 / direct.exchangeRate)
    dataStorage[direct.key] = direct;
    dataStorage[reverted.key] = reverted;
};

export const getExchangeRate = (firstCurrency: string, secondCurrency: string): number => {
    if(!Object.keys(dataStorage).length) { return } // storage is empty
    return findRate(firstCurrency, secondCurrency, dataStorage);
};

