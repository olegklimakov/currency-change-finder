import { Rate } from "./rate.class";

describe('RATE CLASS TESTS', function() {
    let testedClass: Rate;
    beforeEach(() => {
        testedClass = new Rate('USD', 'RUB');
    });

    it('created and have default exchange', function () {
        expect(testedClass.exchangeRate).toBe(0);
    });

    it('reduce number of digits correctly', function () {
        let newTested = new Rate('USD', 'RUB', 6.123123123);
        expect(newTested.exchangeRate).toBe(6.123123);
    });

    it('makes correct key', function () {
        expect(testedClass.key).toBe('USD-RUB');
    });

    it('check is same rate', function () {
        expect(testedClass.isTheSame('USD', 'RUB')).toBeTruthy();
    });

    it('check wrong same rate', function () {
        expect(testedClass.isTheSame('USD', 'CAD')).toBeFalsy();
    });

    it('check reverted rate', function () {
        let newTested = new Rate('RUB', 'USD', );
        expect(testedClass.isReverted(newTested)).toBeTruthy();
    });

    it('check wrong reverted rate', function () {
        let newTested = new Rate('RUB', 'CAD');
        expect(testedClass.isReverted(newTested)).toBeFalsy();
    });
})
