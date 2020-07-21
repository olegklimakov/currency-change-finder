import { Rate } from "./classes/rate.class";
import { dataStorage, getExchangeRate, setExchangeRate } from "./main";
import { findExpectedResults } from "./utils";

describe('MAIN TEST', function() {

    it('should work with empty data', function () {
        expect(getExchangeRate('EUR', 'CAD')).toBeUndefined();
    });

    it('should work fine on 4 level depth', function () {
        setExchangeRate('EUR', 'RUB', 0.5);
        setExchangeRate('RUB', 'USD', 0.8);
        setExchangeRate('USD', 'SEK', 0.35);
        setExchangeRate('SEK', 'CAD', 0.2);
        expect(getExchangeRate('EUR', 'CAD')).toEqual(0.028);
    });

    it('should work fine on 4 level depth and reverted data and also should rewrite data', function () {
        setExchangeRate('RUB', 'EUR', 0.5);
        setExchangeRate('USD', 'RUB', 0.8);
        setExchangeRate('SEK', 'USD', 0.35);
        setExchangeRate('CAD', 'SEK', 0.2);
        expect(getExchangeRate('EUR', 'CAD')).toEqual(35.714288);
    });

    it('should work fine on 1 level depth', function () {
        expect(getExchangeRate('SEK', 'USD')).toEqual(0.35);
    });

    it('should have correct number of data', function () {
        expect(Object.values(dataStorage).length).toEqual(8);
    });
})
