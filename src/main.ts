const data = [];

export const setExchangeRate = (firstCurrency: string, secondCurrency: string, exchangeRate: number): void => {
    data.push(firstCurrency);
};

export const getExchangeRate = (firstCurrency: string, secondCurrency: string): number => {
    console.log(data);
    return 5;
};

