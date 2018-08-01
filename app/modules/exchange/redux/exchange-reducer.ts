import { StandardAction } from '../../../lib/actions';
import { ConversionRatesData, ConversionResponse, ExchangeState } from '../model/exchange-model';
import { getRatesHashmap } from '../model/exchange-selectors';
import {
  CONVERSION_INIT_SUCCESS, CONVERSION_RESPONSE, ConversionAction,
} from './exchange-actions';

const defaultConversionRatesData = {
  time: '2018-07-01',
  base: 'EUR',
  rates: [
    { currency: 'USD', rate: '1.1736' },
    { currency: 'JPY', rate: '130.84' },
    { currency: 'BGN', rate: '1.9558' },
    { currency: 'CZK', rate: '25.598' },
    { currency: 'DKK', rate: '7.4499' },
    { currency: 'GBP', rate: '0.89220' },
    { currency: 'HUF', rate: '320.43' },
    { currency: 'PLN', rate: '4.2770' },
    { currency: 'RON', rate: '4.6255' },
    { currency: 'SEK', rate: '10.2570' },
    { currency: 'CHF', rate: '1.1592' },
    { currency: 'ISK', rate: '122.80' },
    { currency: 'NOK', rate: '9.5338' },
    { currency: 'HRK', rate: '7.4020' },
    { currency: 'RUB', rate: '73.2097' },
    { currency: 'TRY', rate: '5.7319' },
    { currency: 'AUD', rate: '1.5804' },
    { currency: 'BRL', rate: '4.3818' },
    { currency: 'CAD', rate: '1.5298' },
    { currency: 'CNY', rate: '8.0178' },
    { currency: 'HKD', rate: '9.2114' },
    { currency: 'IDR', rate: '16923.31' },
    { currency: 'ILS', rate: '4.3022' },
    { currency: 'INR', rate: '80.4445' },
    { currency: 'KRW', rate: '1312.79' },
    { currency: 'MXN', rate: '21.7820' },
    { currency: 'MYR', rate: '4.7631' },
    { currency: 'NZD', rate: '1.7213' },
    { currency: 'PHP', rate: '62.318' },
    { currency: 'SGD', rate: '1.5976' },
    { currency: 'THB', rate: '39.010' },
    { currency: 'ZAR', rate: '15.3676' }
  ]
};

const emptyConversion = {
  from: {currency: 'EUR', amount: 0},
  to: {currency: 'USD', amount: 0},
  toCurrency: 'USD',
};

const defaultState = {
  conversionRatesData: undefined,
  currentConversion: emptyConversion,
  rates: {},
  requestHistory: [],
  loading: false,
};

export const exchange = (
    state: ExchangeState = defaultState,
    action: StandardAction<ConversionAction>,
  ): ExchangeState => {
  switch (action.type) {

    case CONVERSION_INIT_SUCCESS:
      const currentConversionRatesData = action.payload as ConversionRatesData;
      return {
        ...state,
        conversionRatesData: currentConversionRatesData,
        rates: getRatesHashmap(currentConversionRatesData),
        loading: false,
      };

    case CONVERSION_RESPONSE:
      const currentConversion = action.payload as ConversionResponse;
      return {
        ...state,
        currentConversion,
        requestHistory: [...state.requestHistory, currentConversion],
      };

    default:
      return {
        ...state,
      };
  }
};

export default exchange;
