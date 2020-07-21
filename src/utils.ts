import { DataStorageModel } from "./models/data-storage.model";
import { Rate } from "./classes/rate.class";

const SEPARATOR: string = '-';
interface UpdatedOriginalData { filtered: Rate[], updatedOriginal: Rate[] }

// create key for hash map
export const makeObjectKey = (first: string, second: string): string => {
    return `${first}${SEPARATOR}${second}`
}

export const findRate = (first: string, second: string, data: DataStorageModel): number => {

    // exit cycle condition
    let foundedRate = -1;
    let array = Object.values(data);
    let filterByLast = array.filter(item => item.second === second);
    array = removeFilteredItemsFromOriginArray(filterByLast, array);

    // one of possible solution - use recursive functions, but cycle usage is better for garbage collector and performance;
    // in case of 10 currencies it is okay to use recursive functions, but here we try to make ± universal library for public use;
    while (foundedRate < 0) {
        if( !filterByLast.length) { return 0; }
        const result = findExpectedResult(filterByLast, first, second); // check filtered array
        if (result.length) {
            foundedRate = findLessValue(result); // and here we will done with cycle;
        } else {
            const { filtered, updatedOriginal } = updateFilteredArrayByFindInDepths(filterByLast, array); // update filtered array and origin array
            filterByLast = filtered;
            array = updatedOriginal;
        }
    }
    return foundedRate;
};

//Array of suitable items (because we can get it by different ways)
const findExpectedResult = (filteredData: Rate[], first: string, second: string): Rate[] => {
    return filteredData.filter(rate => rate.isTheSame(first, second))
}

const updateFilteredArrayByFindInDepths = (filteredBySecondCurrency: Rate[], original: Rate[]): UpdatedOriginalData  => {
    let updatedOriginal = original;

    // if we want to find RUB - CAD, here we try to make new array which replaces USD - CAD with RUB - USD and other acceptable;
    const filtered = filteredBySecondCurrency.reduce((acc, item) => {
        // find new level of valid items by second currency name;
        const newItems = original.filter(rate => rate.second === item.first && !item.isReverted(rate));
        updatedOriginal = removeFilteredItemsFromOriginArray(newItems, updatedOriginal);

        // recalculate it to have our desired second param
        if (newItems.length) {
            makeNewArrayItemsWithNewRate(newItems, item);
        }
        return [
            ...newItems,
            ...acc,
        ]
    }, []);
    return { filtered, updatedOriginal }
}

// from items CAD - USD and RUB - USD in case if we want to find SEK - EUR we calculate rates and modify items to =>
// from CAD-USD to CAD - EUR
// from RUB - USD  to RUB - EUR
// keep second currency the same and calculate;
const makeNewArrayItemsWithNewRate = ( associatedArray: Rate[], currentFilteredItem: Rate ): Rate[] => {
    associatedArray.forEach((rate, index) => {
        associatedArray[index] = new Rate(
            rate.first,
            currentFilteredItem.second,
            rate.exchangeRate * currentFilteredItem.exchangeRate
        )
    })
    return associatedArray;
}

// in case we have 2 possibilities to get rate we should get lower (can be customised in future)
const findLessValue = (filteredData: Rate[]): number => {
    return filteredData.reduce((acc, item) => {
        // take lowest number from rate;
        return item.exchangeRate < acc || acc == 0 ? item.exchangeRate : acc ;
    }, 0)
}

// to avoid infinite loops we should reduce number of items in origin array;
const removeFilteredItemsFromOriginArray = (filteredData: Rate[], origin: Rate[]): Rate[] => {
    return origin.filter(originalItems => !filteredData.some(item => originalItems.isTheSame(item.first, item.second) || originalItems.isReverted(item)))
}
