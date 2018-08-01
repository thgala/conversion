import { call, fork, put, select, take } from 'redux-saga/effects';
import { apiRequestResponder, ServiceReponse } from '../../../lib/api-request';
import { ConversionRequest, ExchangeState, services } from '../model/exchange-model';
import { getRateConfig } from '../model/exchange-selectors';
import {
    CONVERSION_INIT,
    CONVERSION_REQUEST,
    createConversionRateResponse,
    initConversionRateData,
    initConversionRateFailure,
    initConversionRateSuccess,
} from '../redux/exchange-actions';

// INIT
export function* requestConversionRatesResponder() {
    yield call(
        apiRequestResponder,
        services.rateServiceConfig.index,
        onConversionRatesRequestSuccess,
        onConversionRatesRequestFailure,
    );
}

export function* onConversionRatesRequestSuccess(response: ServiceReponse) {
    const currencyState = JSON.parse(response.data._bodyText!);
    yield put(initConversionRateSuccess(currencyState));
}

export function* onConversionRatesRequestFailure(response: ServiceReponse) {
    yield put(initConversionRateFailure());
}

export function* listenToInitConversionRates() {
    while (true) {
        yield take(CONVERSION_INIT);
        yield fork(requestConversionRatesResponder);
    }
}

export function* initConversionRates() {
    yield put(initConversionRateData());
}

// REQUEST
export function* listenToConversionRequest() {
    while (true) {
        const { payload } = yield take(CONVERSION_REQUEST);
        yield call(processRequest, payload);
    }
}

export function* processRequest(payload: ConversionRequest) {
    const { rates } = yield select((state: { exchange: ExchangeState }) => state.exchange);
    const { from, to , toCurrency } = payload;
    const currentConversion = {
        from: from ? from : getRateConfig(rates, to!, toCurrency),
        to: to ? to : getRateConfig(rates, from!, toCurrency),
    };
    yield put(createConversionRateResponse(currentConversion));
}
