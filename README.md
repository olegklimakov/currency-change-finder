# Currency Rate Finder

## How to run locally

You can run this library with `npm run start`

It use Typescript as default language, for build use `npm run build`

Tests Run `npm t` or `npm run tests`

## Examples

`setExchangeRate('USD', 'RUB', 70)` - used to set data into storage;
 
`getExchangeRate('USD', 'RUB')` - will return you data;

it is also possible to find rate throw the chain;
for example you can get USD - CAD rate if you set USD - RUB, RUB - EUR, EUR - CAD.
