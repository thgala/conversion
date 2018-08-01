import { ConversionRatesData, Rate, RateConfig, RatesMap } from './exchange-model';

export const getCurrencyList = (info: ConversionRatesData) => (
  info && info.rates && info.base ? [...info.rates.map((rate: Rate) => rate.currency), info.base] : []);

export const getRatesArray = (info: ConversionRatesData) => info.rates;

export const getRatesHashmap = (serverBlob: ConversionRatesData): RatesMap => getRatesArray(serverBlob).reduce(
    (prev: RatesMap, curr: Rate) => {
      return {...prev, [curr.currency]: curr};
    }, { EUR: { currency: serverBlob.base, rate: '1'} }
);

export const getRate = (rates: {[key: string]: Rate}, currency: string) => parseFloat(rates[currency].rate);

export const getRateConfig = (rates: {[key: string]: Rate}, base: RateConfig, toCurrency: string): RateConfig => {
  return {
    currency: toCurrency,
    amount: getRate(rates, toCurrency) / getRate(rates, base.currency) * base.amount,
  };
};
