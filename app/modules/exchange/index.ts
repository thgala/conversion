import {exchange as reducer} from './redux/exchange-reducer';
import { initConversionRates, listenToConversionRequest, listenToInitConversionRates } from './sagas/exchange-saga';
const name = 'exchange';
const exchangeModule = {
    name,
    reducer: {
        [name]: reducer,
    },
    bootSagas: [
        listenToInitConversionRates,
        listenToConversionRequest,
        initConversionRates,
    ],
};

export default exchangeModule;
