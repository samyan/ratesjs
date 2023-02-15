
# ratesjs

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
.getLatest('USD', ['RUB', 'GBP']);
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
.getLatest('USDT', ['BTC', 'ETH']);
````

```sh
{ BTC: '22175.80000000', ETH: '1552.45000000' }
```