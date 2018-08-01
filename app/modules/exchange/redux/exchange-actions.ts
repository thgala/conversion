import { ConversionRatesData, ConversionRequest, ConversionResponse } from '../model/exchange-model';

export const CONVERSION_INIT = 'exchange/CONVERSION_INIT';
export const CONVERSION_INIT_SUCCESS = 'exchange/CONVERSION_INIT_SUCCESS';
export const CONVERSION_INIT_FAILURE = 'exchange/CONVERSION_INIT_FAILURE';
export const CONVERSION_REQUEST = 'exchange/CONVERSION_REQUEST';
export const CONVERSION_RESPONSE = 'exchange/CONVERSION_RESPONSE';
export const HISTORY_LOADED = 'exchange/HISTORY_LOADED';

export type ConversionAction = ConversionRatesData | ConversionRequest | ConversionResponse | void;

export const initConversionRateData = () => {
    return {
        type: CONVERSION_INIT,
    };
};

export const initConversionRateSuccess = (payload: ConversionRatesData) => {
    return {
        type: CONVERSION_INIT_SUCCESS,
        payload,
    };
};

export const initConversionRateFailure = () => {
    return {
        type: CONVERSION_INIT_FAILURE,
    };
};

export const createConversionRateRequest = (request: ConversionRequest) => {
    return {
        type: CONVERSION_REQUEST,
        payload: request,
    };
};

export const createConversionRateResponse = (response: ConversionResponse) => {
    return {
        type: CONVERSION_RESPONSE,
        payload: response,
    };
};
