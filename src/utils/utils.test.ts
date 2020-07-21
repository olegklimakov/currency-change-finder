import { Rate } from "../classes/rate.class";
import {
    findExpectedResults,
    updateFilteredArrayByFindInDepths,
    makeNewArrayItemsWithNewRate,
    findLessValue,
    removeFilteredItemsFromOriginArray, findRate
} from "./index";

describe('UTILS', function() {
    let origin;
    const USDRUB = new Rate('USD', 'RUB', 0.2);
    const RUBUSD = new Rate('RUB', 'USD', 0.3);
    const USDCAD = new Rate('USD', 'CAD', 0.4);
    const CADUSD = new Rate('CAD', 'USD', 0.5);

    beforeEach(() => {
        origin = [ USDRUB, RUBUSD, USDCAD, CADUSD ];
    })

    it('find expected result', function () {
        let filteredData = [
            new Rate('USD', 'RUB'),
            new Rate('USD', 'CAD')
        ]
        expect(findExpectedResults(filteredData, 'USD', 'RUB')).toEqual([new Rate('USD', 'RUB')]);
    });

    it('should return empty array if no result', function () {
        let filteredData = [
            new Rate('USD', 'RUB'),
            new Rate('USD', 'CAD')
        ]
        expect(findExpectedResults(filteredData, 'USD', 'TEST')).toEqual([]);
    });

    it('should make new origin and filtered', function () {
        let filteredData = [
            new Rate('CAD', 'EUR')
        ];
        const result = {
            filtered: [
                new Rate('USD', 'EUR')
            ],
            updatedOriginal: [USDRUB, RUBUSD],
        }
        expect(updateFilteredArrayByFindInDepths(filteredData, origin)).toEqual(result);
    });

    it('should make empty filtered and full origin', function () {
        let filteredData = [
            new Rate('TEST', 'EUR')
        ];
        const result = {
            filtered: [],
            updatedOriginal: origin,
        }
        expect(updateFilteredArrayByFindInDepths(filteredData, origin)).toEqual(result);
    });

    it('should new array items with new rate', function () {
        const associated = new Rate('RUB', 'EUR', 0.1)

        let filteredData = [
            new Rate('USD', 'RUB', 0.2),
            new Rate('SEK', 'RUB', 4),
        ];
        const result = [
            new Rate('USD', 'EUR', 0.02),
            new Rate('SEK', 'EUR', 0.4),
        ]
        expect(makeNewArrayItemsWithNewRate(filteredData, associated)).toEqual(result);
    });

    it('should find correct less value', function () {
        let filteredData = [
            new Rate('USD', 'RUB', 0.2),
            new Rate('USD', 'RUB', 4),
        ];
        expect(findLessValue(filteredData)).toEqual(0.2);
    });

    it('findLessValue should work fine with empty array', function () {
        let filteredData = [];
        expect(findLessValue(filteredData)).toEqual(0);
    });

    it('should remove Filtered Items From Origin Array', function () {
        let filteredData = [
            new Rate('CAD', 'USD'),
        ];
        const result = [ USDRUB, RUBUSD]
        expect(removeFilteredItemsFromOriginArray(filteredData, origin)).toEqual(result);
    });

    it('should find rate 2 depth level', function () {
        expect(findRate('RUB', 'CAD', origin)).toEqual(0.12);
    });

    it('should find rate 1 depth level', function () {
        expect(findRate('USD', 'RUB', origin)).toEqual(0.2);
    });

    it('should return 0 with wrong items', function () {
        expect(findRate('RUB', 'TEST', origin)).toEqual(0);
    });
})
