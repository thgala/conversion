import { call } from 'redux-saga/effects';

export interface ServiceDifinition {
    url: string;
    method: string;
}

export interface ServiceMap {
    [key: string]: ServiceDifinition;
}

export interface ServiceReponse {
    ok: boolean;
    data: {
        _bodyText?: string;
    };
    error?: string;
}

export function* apiRequest(service: ServiceDifinition) {
    try {
        const response = yield call(fetch, service.url, { method: service.method });
        return { data:  response };
    } catch (error) {
        return { error };
    }
}

export function* apiRequestResponder(
    service: ServiceDifinition,
    successCallback: (response: ServiceReponse) => IterableIterator<{}>,
    failureCallback: (response: ServiceReponse) => IterableIterator<{}>,
) {
    const response: ServiceReponse = yield call(apiRequest, service);
    const callBack = !response.error ? successCallback : failureCallback;
    yield call(callBack, response);
    return response;
}
