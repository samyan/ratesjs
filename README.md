
# ratesjs ![Version](https://img.shields.io/npm/v/ratesjs) ![License](https://img.shields.io/npm/l/ratesjs)

Library for get currencies rates from different sources. The currently supported sources are **Binance** and **Yahoo**.

## Install

```sh
npm i ratesjs
```

## Usage

### Example 1

````typescript
const  currencyRates = new  CurrencyRates();

const  result = await  currencyRates
    .getProvider('yahoo')
    .setBase('USD')
    .setTargets(['RUB', 'RUB'])
    .getResult('latest');
````

```sh
{ RUB: '73.6008', GBP: '0.82162' }
```

--------------

### Example 2
````typescript
const  currencyRates = new  CurrencyRates();

const  result = await  currencyRates
    .getProvider('binance')
    .setBase('USDT')
    .setTargets(['BTC', 'ETH'])
    .getResult('latest');
````

```sh
{ BTC: '22175.80000000', ETH: '1552.45000000' }
```
